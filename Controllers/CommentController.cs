using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CommentController
{
    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/course/{courseId}/comments/add", async (StudyDb db, Comment comment, int courseId) =>
        {            
            Random rnd = new Random();
            Console.Write(comment);
            comment.Id = rnd.Next(100);
            comment.DateAdded = DateTime.Now;
            comment.CourseId = courseId;
            db.Comments.Add(comment);        
            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseId}", comment);
        });

        app.MapPost("api/file/{fileId}/comments/add", async (StudyDb db, Comment comment, int fileId) =>
        {
            var file = db.CourseFiles.FindAsync(fileId);
            Random rnd = new Random();
            comment.Id = rnd.Next(100);
            comment.DateAdded = DateTime.Now;
            comment.FileId = fileId;
            db.Comments.Add(comment);        
            await db.SaveChangesAsync();
            return Results.Created($"/course/{file.Result.CourseId}/file/{fileId}/", comment);
        });

        app.MapGet("api/course/{courseId}/comments", async (StudyDb db, int courseId) =>
        {
            var comments = db.Comments.Where(s => s.CourseId == courseId);
            if (comments is null) return Results.NotFound();
            return Results.Ok(comments);
        });

        app.MapGet("api/file/{fileId}/comments", async (StudyDb db, int courseId, int fileId) =>
        {
            var comments = db.Comments.Where(s => s.FileId == fileId);
            if (comments is null) return Results.NotFound();
            return Results.Ok(comments);
        });

        /* TODO
        app.MapGet("api/course/{courseId}/file/comments/latest", async (StudyDb db) =>
        {
            return await db.Comments.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
        */

        app.MapGet("api/comments/latest", async (StudyDb db) =>
        {
            return await db.Comments.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}



