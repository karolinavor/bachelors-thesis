using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CommentController
{
    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/course/{courseID}/comments/add", async (StudyDb db, Comment comment, int courseID) =>
        {        
            var course = db.Courses.FindAsync(courseID);
            comment.DateAdded = DateTime.Now;
            comment.CourseID = courseID;
            comment.UserID = 0;
            comment.CategoryName = course.Result.Short + " - " + course.Result.Title;
            comment.FileID = 0;
            comment.Likes = 0;
            comment.Dislikes = 0;
            db.Comments.Add(comment);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseID}", comment);
        });

        app.MapPost("api/file/{fileID}/comments/add", async (StudyDb db, Comment comment, int fileID) =>
        {
            var file = db.CourseFiles.FindAsync(fileID);
            comment.DateAdded = DateTime.Now;
            comment.FileID = fileID;
            comment.UserID = 0;
            comment.CourseID = file.Result.CourseID;
            comment.CategoryName = file.Result.Name;
            comment.Likes = 0;
            comment.Dislikes = 0;
            db.Comments.Add(comment);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{file.Result.CourseID}/file/{fileID}/", comment);

            // trigger, pri kterem zkontroluju, jestli je na soubor/kurz nastavena notifikace. N a FE zobrazuju log.
        });

        app.MapDelete("api/comment/{commentID}/delete", async (StudyDb db, int commentID) =>
        {
            var comment = await db.Comments.FindAsync(commentID);
            if (comment is null) return Results.NotFound();
            db.Comments.Remove(comment);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CommentDeleted;
            log.DateAdded = DateTime.Now;
            log.CommentID = comment.CommentID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();

            // TODO kaskadove mazani u vsech delete
        });

        app.MapGet("api/course/{courseID}/comments", async (StudyDb db, int courseID) =>
        {
            var comments = db.Comments.Where(s => s.CourseID == courseID).OrderByDescending(s => s.DateAdded);
            if (comments is null) return Results.NotFound();
            // TODO naplnit likes/dislikes
            return Results.Ok(comments);
        });

        app.MapGet("api/file/{fileID}/comments", async (StudyDb db, int fileID) =>
        {
            var comments = db.Comments.Where(s => s.FileID == fileID).OrderByDescending(s => s.DateAdded);
            if (comments is null) return Results.NotFound();
            // TODO naplnit likes/dislikes
            return Results.Ok(comments);
        });

        app.MapGet("api/comments/latest", async (StudyDb db) =>
        {
            return await db.Comments.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}



