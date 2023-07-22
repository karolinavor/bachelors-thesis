using bachelor_thesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Controllers;

public static class CourseFileController
{
    public static void MapCourseFileControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/file/{id}", (int id) =>
        {
            return new CourseFile
            {
                Id = 1,
                Name = "Soubor",
                Author = "Alice Morley",
                DatePublished = "12.2.2023",
                Filetype = "pdf",
                Url = "",
                Thumbnail = "",
                Size = "32MB",
                Likes = 10,
                Dislikes = 2,
                NumberOfDownloads = 12,
                Comments = Enumerable.Range(1, 3).Select(index => new Comment
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
            };
        });

        app.MapGet("api/file/latest", () =>
        {
            return Enumerable.Range(1, 5).Select(index => new CourseFile
            {
                Id = 1,
                Name = "Soubor",
                Author = "Alice Morley",
                DatePublished = "12.2.2023",
                Filetype = "pdf",
                Url = "",
                Thumbnail = "",
                Size = "32MB",
                Likes = 10,
                Dislikes = 2,
                NumberOfDownloads = 12,
                Comments = Enumerable.Range(1, 3).Select(index => new Comment
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
            })
            .ToArray();
        });
    }
}





