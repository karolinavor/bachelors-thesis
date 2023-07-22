using bachelor_thesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Controllers;

public static class CommentController
{
    public static void MapCommentControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/comment/latest", () =>
        {
            return Enumerable.Range(1, 4).Select(index => new Comment
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
            .ToArray();
        });
    }
}



