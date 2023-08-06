using BachelorsThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorsThesis.Database;

namespace BachelorsThesis.Controllers;

public static class LogController
{
    public static void MapLogControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/log", async (StudyDb db) =>
        {
            return await db.Logs.OrderByDescending(s => s.LogID).ToListAsync();
        }).RequireAuthorization();
    }
}