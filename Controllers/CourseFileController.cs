using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseFileController
{
    public static void MapCourseFileControllerRoutes(this WebApplication app)
    {    
        app.MapGet("api/file/{courseFileID}/get", async (StudyDb db, int courseFileID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var courseFile = await db.CourseFiles.FindAsync(courseFileID);
            if (courseFile is null) return Results.NotFound();
            var notificationSet = db.Notifications.SingleOrDefault(s => s.CourseFileID == courseFileID && s.UserID == user.UserID);
            if (notificationSet != null) {
                courseFile.NotificationSet = true;
            } else {
                courseFile.NotificationSet = false;
            }

            courseFile.Likes = db.Reactions.Where(s => s.CourseFileID == courseFileID && s.ReactionType == ReactionType.Like).Count();
            courseFile.Dislikes = db.Reactions.Where(s => s.CourseFileID == courseFileID && s.ReactionType == ReactionType.Dislike).Count();

            var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CourseFileID == courseFileID);
            if (reacted != null) {
                if (reacted.ReactionType == ReactionType.Like) {
                    courseFile.Reacted = ReactedType.Liked;
                } else {
                    courseFile.Reacted = ReactedType.Disliked;
                }
            } else {
                courseFile.Reacted = ReactedType.None;
            }

            return Results.Ok(courseFile);
        }).RequireAuthorization();

        app.MapPost("api/course/{courseID}/file/add", async (StudyDb db, int courseID, HttpContext context, HttpRequest request) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var courseFile = new CourseFile();
            courseFile.DateAdded = DateTime.Now;
            courseFile.CourseID = courseID;
            courseFile.Name = context.Request.Form["name"];
            courseFile.UserID = user.UserID;
            courseFile.Username = user.Username;
            courseFile.Size = Int32.Parse(context.Request.Form["size"]);
            courseFile.Filetype = context.Request.Form["filetype"];
            courseFile.NotificationSet = false;
            courseFile.Description = context.Request.Form["description"];
            courseFile.Url = $"FileSystem/course_{courseID}/file_{courseFile.CourseID}.{courseFile.Filetype}";
            courseFile.NumberOfDownloads = 0;
            db.CourseFiles.Add(courseFile);
            await db.SaveChangesAsync();

            if (!Directory.Exists("FileSystem/course_{courseID}/")) {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "FileSystem",$"course_{courseID}"));
            }

            var courseFolder = $"FileSystem/course_{courseID}/";
            var folder = Path.Combine(Directory.GetCurrentDirectory(), courseFolder);
            var postedFileName = $"file_{courseFile.CourseID}.{courseFile.Filetype}";
            var finalPath = Path.Combine(folder, postedFileName);
            using var fs = File.OpenWrite(finalPath);
            await request.Form.Files[0].CopyToAsync(fs);

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CourseFileAdded;
            log.DateAdded = DateTime.Now;
            log.CourseFileID = courseFile.CourseFileID;
            log.CourseID = courseID;
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
                smtpClient.Send("vorlka00@upol.cz", subscribedUser.Email, "UPSHARE: New file", "New file uploaded in course " + db.Courses.SingleOrDefault(c => c.CourseID == courseID).Title + ".");
            }   
            
            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseID}/file/{courseFile.CourseID}", courseFile);
        }).RequireAuthorization();

        app.MapGet("api/file/{courseFileID}/download", async (StudyDb db, int courseFileID) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(courseFileID);
            if (courseFile is null) return Results.NotFound();
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url)))
            {
                courseFile.NumberOfDownloads = courseFile.NumberOfDownloads + 1;
                await db.SaveChangesAsync();
                return Results.File(Path.Combine(Directory.GetCurrentDirectory(), courseFile.Url));
            }
            else
            {
                return Results.NotFound();
            }
        }).RequireAuthorization();

        app.MapDelete("api/file/{courseFileID}/delete", async (StudyDb db, int courseFileID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var courseFile = await db.CourseFiles.FindAsync(courseFileID);
            if (courseFile is null) return Results.NotFound();
            db.CourseFiles.Remove(courseFile);
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url))) {
                File.Delete(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url));
            }

            var reactions = db.Reactions.Where(s => s.CourseFileID == courseFile.CourseFileID);
            foreach (var reaction in reactions) {
                db.Reactions.Remove(reaction);
            }

            var comments = db.Comments.Where(s => s.CourseFileID == courseFileID);
            foreach (var comment in comments) {
                db.Comments.Remove(comment);

                var commentReactions = db.Reactions.Where(s => s.CommentID == comment.CommentID);
                foreach (var commentReaction in commentReactions) {
                    db.Reactions.Remove(commentReaction);
                }
            }

            var logs = db.Logs.Where(s => s.CourseFileID == courseFileID);
            foreach (var log in logs) {
                db.Logs.Remove(log);
            }

            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("api/course/{courseID}/files", async (StudyDb db, int courseID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var courseFiles = db.CourseFiles.Where(s => s.CourseID == courseID).OrderByDescending(s => s.DateAdded);
            if (courseFiles is null) return Results.NotFound();

            foreach (var courseFile in courseFiles) {
                courseFile.Likes = db.Reactions.Where(s => s.CourseFileID == courseFile.CourseFileID && s.ReactionType == ReactionType.Like).Count();
                courseFile.Dislikes = db.Reactions.Where(s => s.CourseFileID == courseFile.CourseFileID && s.ReactionType == ReactionType.Dislike).Count();

                var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CourseFileID == courseFile.CourseFileID);
                if (reacted != null) {
                    if (reacted.ReactionType == ReactionType.Like) {
                        courseFile.Reacted = ReactedType.Liked;
                    } else {
                        courseFile.Reacted = ReactedType.Disliked;
                    }
                } else {
                    courseFile.Reacted = ReactedType.None;
                }
            }

            return Results.Ok(courseFiles);
        });

        app.MapGet("api/files/latest", async (StudyDb db) =>
        {
            return await db.CourseFiles.OrderByDescending(s => s.DateAdded).Take(10).ToListAsync();
        }).RequireAuthorization();
    }
}





