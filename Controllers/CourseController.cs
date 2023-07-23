using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseController
{
    public static void MapCourseControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/course/{id}", async (StudyDb db, int id) =>
        {
            return await db.Courses.FindAsync(id);
        });

        app.MapPost("api/course/add", async (StudyDb db, Course course) =>
        {   
            await db.Courses.AddAsync(course);
            Random rnd = new Random();
            course.Id = rnd.Next(100);
            course.DateAdded = DateTime.Now;
            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.Id}", course);
        });

        app.MapPut("api/course/{id}", async (StudyDb db, Course updatedCourse, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null) return Results.NotFound();
            course.Title = updatedCourse.Title;
            course.Short = updatedCourse.Short;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
        
        app.MapDelete("api/course/{id}", async (StudyDb db, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null)
            {
                return Results.NotFound();
            }
            db.Courses.Remove(course);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/courses", async (StudyDb db) =>
        {
            return await db.Courses.ToListAsync();
        });

        app.MapGet("api/course/latest", async (StudyDb db) =>
        {
            return await db.Courses.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}

