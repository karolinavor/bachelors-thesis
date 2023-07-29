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
            news.NewsId = Interlocked.Increment(ref globalNewsID);
            news.DateAdded = DateTime.Now;
            news.UserId = 0;
            await db.News.AddAsync(news);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.NewsAdded;
            log.DateAdded = DateTime.Now;
            log.NewsId = news.NewsId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created("/", news);
        });

        app.MapGet("api/news/{newsId}/get", async (StudyDb db, int newsId) =>
        {
            var news = await db.News.FindAsync(newsId);
            if (news is null) return Results.NotFound();
            return Results.Ok(news);
        });

        app.MapPut("api/news/{newsId}/edit", async (StudyDb db, News updatedNews, int newsId) =>
        {
            var news = await db.News.FindAsync(newsId);
            if (news is null) return Results.NotFound();
            news.Content = updatedNews.Content;

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.NewsEdited;
            log.DateAdded = DateTime.Now;
            log.NewsId = news.NewsId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapDelete("api/news/{newsId}/delete", async (StudyDb db, int newsId) =>
        {
            var news = await db.News.FindAsync(newsId);
            if (news is null) return Results.NotFound();
            db.News.Remove(news);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.NewsDeleted;
            log.DateAdded = DateTime.Now;
            log.NewsId = news.NewsId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });
    }
}







