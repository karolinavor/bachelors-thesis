using bachelor_thesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Controllers;

public static class CourseController
{
    public static void MapCourseControllerRoutes(this WebApplication app)
    {
        app.MapGet("/course/{id}", (int id) =>
        {
            return new Course
            {
                Id = 1,
                Title = "Informacni technologie",
                Short = "INFT",
                Files = Enumerable.Range(1, 5).Select(index => new CourseFile
                {
                    Id = index,
                    Name = "Soubor",
                    Author = "Karolina Nova",
                    DatePublished = "12.2.2023",
                    Filetype = "pdf",
                    Url = "",
                    Thumbnail = "",
                    Size = "32MB",
                    Likes = 10,
                    Dislikes = 2,
                    NumberOfDownloads = 12
                }),
                Comments = Enumerable.Range(1, 3).Select(index => new Comment
                {
                    Id = index,
                    CommentText = "Test comment course",
                    Type = "Course",
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
            };
        });

        app.MapPost("/course/add", async (CourseDb db, Course course) =>
        {   
            await db.Courses.AddAsync(course);
            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.Id}", course);
        });

        app.MapPut("/course/edit", async (Course course) =>
        {
    
        });

        app.MapGet("/course/list", async (CourseDb db) =>
        {
            await db.Courses.ToListAsync();
        });

        app.MapGet("/course/comments", () =>
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

        app.MapGet("/course/latest", () =>
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

