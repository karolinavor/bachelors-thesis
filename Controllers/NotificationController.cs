using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class NotificationController
{

    public static int globalNotificationID;

    public static void MapNotificationControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/notifications/get", async (StudyDb db) =>
        {
            return await db.Notifications.OrderByDescending(s => s.NotificationId).ToListAsync();
        });

        app.MapPost("api/notifications/add", async (StudyDb db, Notification notification) =>
        {
            await db.Notifications.AddAsync(notification);
            notification.NotificationId = Interlocked.Increment(ref globalNotificationID);
            await db.SaveChangesAsync();
            return Results.Created("/", notification);
        }); // TODO toggle notifications
    }
}







