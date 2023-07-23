using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CommentController
{
    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/comment/latest", async (StudyDb db) =>
        {
            return await db.Comments.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });

        app.MapGet("api/course/{id}/comments", async (StudyDb db, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null) return Results.NotFound();
            //return Results.Ok(course?.Comments);
            return Results.Ok();
        });

        app.MapGet("api/file/{fileId}/comments", async (StudyDb db, int courseId, int fileId) =>
        {
            var file = await db.CourseFiles.FindAsync(fileId);
            if (file is null) return Results.NotFound();
            //return Results.Ok(file?.Comments);
            return Results.Ok();
        });
    }
}



