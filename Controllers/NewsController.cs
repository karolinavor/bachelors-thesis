using System.Security.Claims;
using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class NewsController
{
    public static void MapNewsControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/news", async (StudyDb db) =>
        {
            return await db.News.OrderByDescending(s => s.DateAdded).Take(3).ToListAsync();
        }).RequireAuthorization();

        app.MapGet("api/news/all", async (StudyDb db) =>
        {
            return await db.News.OrderByDescending(s => s.DateAdded).ToListAsync();
        }).RequireAuthorization();

        app.MapPost("api/news/add", async (StudyDb db, News news, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            news.DateAdded = DateTime.Now;
            news.UserID = user.UserID;
            await db.News.AddAsync(news);
            await db.SaveChangesAsync();

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.NewsAdded;
            log.DateAdded = DateTime.Now;
            log.NewsID = news.NewsID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created("/", news);
        }).RequireAuthorization();

        app.MapGet("api/news/{newsID}/get", async (StudyDb db, int newsID) =>
        {
            var news = await db.News.FindAsync(newsID);
            if (news is null) return Results.NotFound();
            return Results.Ok(news);
        }).RequireAuthorization();

        app.MapPut("api/news/{newsID}/edit", async (StudyDb db, News updatedNews, int newsID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var news = await db.News.FindAsync(newsID);
            if (news is null) return Results.NotFound();
            news.Content = updatedNews.Content;

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.NewsEdited;
            log.DateAdded = DateTime.Now;
            log.NewsID = news.NewsID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapDelete("api/news/{newsID}/delete", async (StudyDb db, int newsID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var news = await db.News.FindAsync(newsID);
            if (news is null) return Results.NotFound();
            db.News.Remove(news);

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.NewsDeleted;
            log.DateAdded = DateTime.Now;
            log.NewsID = news.NewsID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();
    }
}







