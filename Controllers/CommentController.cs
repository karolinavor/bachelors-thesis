using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CommentController
{
    public static int globalCommentID;

    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/course/{courseId}/comments/add", async (StudyDb db, Comment comment, int courseId) =>
        {        
            var course = db.Courses.FindAsync(courseId);
            comment.CommentId = Interlocked.Increment(ref globalCommentID);
            comment.DateAdded = DateTime.Now;
            comment.CourseId = courseId;
            comment.UserId = 0;
            comment.CategoryName = course.Result.Short + " - " + course.Result.Title;
            comment.FileId = 0;
            db.Comments.Add(comment);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentId = comment.CommentId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseId}", comment);
        });

        app.MapPost("api/file/{fileId}/comments/add", async (StudyDb db, Comment comment, int fileId) =>
        {
            var file = db.CourseFiles.FindAsync(fileId);
            comment.CommentId = Interlocked.Increment(ref globalCommentID);
            comment.DateAdded = DateTime.Now;
            comment.FileId = fileId;
            comment.UserId = 0;
            comment.CourseId = file.Result.CourseId;
            comment.CategoryName = file.Result.Name;
            db.Comments.Add(comment);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CommentAdded;
            log.DateAdded = DateTime.Now;
            log.CommentId = comment.CommentId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{file.Result.CourseId}/file/{fileId}/", comment);
        });

        app.MapDelete("api/comment/{commentId}/delete", async (StudyDb db, int commentId) =>
        {
            var comment = await db.Comments.FindAsync(commentId);
            if (comment is null) return Results.NotFound();
            db.Comments.Remove(comment);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CommentDeleted;
            log.DateAdded = DateTime.Now;
            log.CommentId = comment.CommentId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/course/{courseId}/comments", async (StudyDb db, int courseId) =>
        {
            var comments = db.Comments.Where(s => s.CourseId == courseId).OrderByDescending(s => s.DateAdded);
            if (comments is null) return Results.NotFound();
            return Results.Ok(comments);
        });

        app.MapGet("api/file/{fileId}/comments", async (StudyDb db, int fileId) =>
        {
            var comments = db.Comments.Where(s => s.FileId == fileId).OrderByDescending(s => s.DateAdded);
            if (comments is null) return Results.NotFound();
            return Results.Ok(comments);
        });

        app.MapGet("api/comments/latest", async (StudyDb db) =>
        {
            return await db.Comments.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}



