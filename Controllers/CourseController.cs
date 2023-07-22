using bachelor_thesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Controllers;

public static class CourseController
{
    public static void MapCourseControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/course/{id}", async (CourseDb db, int id) =>
        {
            return await db.Courses.FindAsync(id);
        });

        app.MapPost("api/course/add", async (CourseDb db, Course course) =>
        {   
            await db.Courses.AddAsync(course);
            Random rnd = new Random();
            course.Id = rnd.Next(100);
            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.Id}", course);
        });

        app.MapPut("api/course/{id}", async (CourseDb db, Course updatedCourse, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null) return Results.NotFound();
            course.Title = updatedCourse.Title;
            course.Short = updatedCourse.Short;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
        
        app.MapDelete("/course/{id}", async (CourseDb db, int id) =>
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

        app.MapGet("api/course/list", async (CourseDb db) =>
        {
            return await db.Courses.ToListAsync();
        });

        app.MapGet("api/course/comments", () =>
        {
            return Enumerable.Range(1, 3).Select(index => new Comment
            {
                Id = index,
                CommentText = "Test comment",
                Type = "File",
                TypeId = 1,
                TypeName = "KMI",
                DatePublished = "1.1. 2023",
                User = new User
                {
                    Id = 1,
                    Name = "Karolina Vorlickova",
                    Username = "test",
                    Email = "test@test.cz",
                    ProfileImage = "url"
                }
            })
            .ToArray();
        });

        app.MapGet("api/course/latest", () =>
        {
            return Enumerable.Range(1, 5).Select(index => new Course
            {
                Id = index,
                Title = "Nahodny predmet",
                Short = "TEST"
            })
            .ToArray();
        });
    }
}

