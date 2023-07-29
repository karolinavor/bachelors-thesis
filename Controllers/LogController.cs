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
    }
}