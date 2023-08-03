using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CommentController
{
    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/course/{courseID}/comments/add", async (StudyDb db, Comment comment, int courseID, HttpContext context) =>
        {        
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var course = db.Courses.FindAsync(courseID);
            comment.DateAdded = DateTime.Now;
            comment.CourseID = courseID;
            comment.UserID = user.UserID;
            comment.CategoryName = course.Result.Short + " - " + course.Result.Title;
            comment.CourseFileID = 0;
            comment.Likes = 0;
            comment.Dislikes = 0;
            comment.Username = db.Users.SingleOrDefault(u => u.UserID == comment.UserID).Username;
            db.Comments.Add(comment);
            await db.SaveChangesAsync();

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            log.CourseID = comment.CourseID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            var notifications = db.Notifications.Where(c => c.CourseID == courseID);
            foreach (var notification in notifications)
            {
                var subscribedUser = db.Users.SingleOrDefault(c => c.UserID == notification.UserID);
                var smtpClient = new SmtpClient("smtp-mail.outlook.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("vorlka00@upol.cz", "W!yr998BPA"),
                    EnableSsl = true,
                };
                smtpClient.Send("vorlka00@upol.cz", subscribedUser.Email, "UPSHARE: New comment", "New comment added in course " + comment.CategoryName + ".");
            }   

            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseID}", comment);
        }).RequireAuthorization();

        app.MapPost("api/file/{courseFileID}/comments/add", async (StudyDb db, Comment comment, int courseFileID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var file = db.CourseFiles.FindAsync(courseFileID);
            comment.DateAdded = DateTime.Now;
            comment.CourseFileID = courseFileID;
            comment.UserID = user.UserID;
            comment.CourseID = 0;
            comment.CategoryName = file.Result.Name;
            comment.Likes = 0;
            comment.Dislikes = 0;
            comment.Username = db.Users.SingleOrDefault(u => u.UserID == comment.UserID).Username;
            db.Comments.Add(comment);
            await db.SaveChangesAsync();

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            log.CourseFileID = courseFileID;
            log.CourseID = file.Result.CourseID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            var notifications = db.Notifications.Where(c => c.CourseFileID == courseFileID);
            foreach (var notification in notifications)
            {
                var subscribedUser = db.Users.SingleOrDefault(c => c.UserID == notification.UserID);
                var smtpClient = new SmtpClient("smtp-mail.outlook.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("vorlka00@upol.cz", "W!yr998BPA"),
                    EnableSsl = true,
                };
                smtpClient.Send("vorlka00@upol.cz", subscribedUser.Email, "UPSHARE: New comment", "New comment added in file " + comment.CategoryName + " in course " + db.Courses.SingleOrDefault(c => c.CourseID == file.Result.CourseID).Title + ".");
            }   

            await db.SaveChangesAsync();
            return Results.Created($"/course/{file.Result.CourseID}/file/{courseFileID}/", comment);
        }).RequireAuthorization();

        app.MapDelete("api/comment/{commentID}/delete", async (StudyDb db, int commentID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var comment = await db.Comments.FindAsync(commentID);
            if (comment is null) return Results.NotFound();
            db.Comments.Remove(comment);

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CommentDeleted;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("api/course/{courseID}/comments", async (StudyDb db, int courseID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var comments = db.Comments.Where(s => s.CourseID == courseID && s.CourseFileID == 0).OrderByDescending(s => s.DateAdded);
            if (comments is null) return Results.NotFound();
            foreach (var comment in comments)
            {
                comment.Username = db.Users.SingleOrDefault(u => u.UserID == comment.UserID).Username;
                comment.Likes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Like).Count();
                comment.Dislikes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Dislike).Count();

                var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CommentID == comment.CommentID);
                if (reacted != null) {
                    if (reacted.ReactionType == ReactionType.Like) {
                        comment.Reacted = ReactedType.Liked;
                    } else {
                        comment.Reacted = ReactedType.Disliked;
                    }
                } else {
                    comment.Reacted = ReactedType.None;
                }
            }
            await db.SaveChangesAsync();
            return Results.Ok(comments);
        }).RequireAuthorization();

        app.MapGet("api/file/{courseFileID}/comments", async (StudyDb db, int courseFileID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var comments = db.Comments.Where(s => s.CourseFileID == courseFileID).OrderByDescending(s => s.DateAdded);
            var file = db.CourseFiles.SingleOrDefault(s => s.CourseFileID == courseFileID);
            if (comments is null) return Results.NotFound();
            foreach (var comment in comments)
            {
                comment.Username = db.Users.SingleOrDefault(u => u.UserID == comment.UserID).Username;
                comment.CourseID = file.CourseID;
                comment.Likes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Like).Count();
                comment.Dislikes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Dislike).Count();

                var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CommentID == comment.CommentID);
                if (reacted != null) {
                    if (reacted.ReactionType == ReactionType.Like) {
                        comment.Reacted = ReactedType.Liked;
                    } else {
                        comment.Reacted = ReactedType.Disliked;
                    }
                } else {
                    comment.Reacted = ReactedType.None;
                }
            }
            await db.SaveChangesAsync();
            return Results.Ok(comments);
        }).RequireAuthorization();

        app.MapGet("api/comments/latest", async (StudyDb db, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var comments = db.Comments.OrderByDescending(s => s.DateAdded).Take(5);
            if (comments is null) return Results.NotFound();
            foreach (var comment in comments)
            {
                comment.Likes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Like).Count();
                comment.Dislikes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Dislike).Count();
                var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CommentID == comment.CommentID);
                if (reacted != null) {
                    if (reacted.ReactionType == ReactionType.Like) {
                        comment.Reacted = ReactedType.Liked;
                    } else {
                        comment.Reacted = ReactedType.Disliked;
                    }
                } else {
                    comment.Reacted = ReactedType.None;
                }
            }
            await db.SaveChangesAsync();
            return Results.Ok(comments);
        }).RequireAuthorization();
    }
}



