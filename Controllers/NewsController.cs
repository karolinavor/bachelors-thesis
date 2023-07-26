using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class NewsController
{

    public static int globalNewsID;

    public static void MapNewsControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/news", async (StudyDb db) =>
        {
            return await db.News.OrderByDescending(s => s.DateAdded).Take(3).ToListAsync();
        });

        app.MapGet("api/news/all", async (StudyDb db) =>
        {
            return await db.News.OrderByDescending(s => s.DateAdded).ToListAsync();
        });

        app.MapPost("api/news/add", async (StudyDb db, News news) =>
        {
            await db.News.AddAsync(news);
            news.NewsId = Interlocked.Increment(ref globalNewsID);
            news.DateAdded = DateTime.Now;
            await db.SaveChangesAsync();
            return Results.Created("/", news);
        });
    }
}







