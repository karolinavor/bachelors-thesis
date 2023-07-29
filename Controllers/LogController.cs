using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class LogController
{

    public static int globalLogID;

    public static void MapLogControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/log", async (StudyDb db) =>
        {
            return await db.Logs.OrderByDescending(s => s.LogId).ToListAsync();
        });

        app.MapPost("api/log/add", async (StudyDb db, Log log) =>
        {
            log.LogId = Interlocked.Increment(ref globalLogID);
            await db.Logs.AddAsync(log);
            await db.SaveChangesAsync();
            return Results.Created("/log", log);
        });
    }
}