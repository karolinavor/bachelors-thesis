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
            var notifications = await db.Notifications.Where(s => s.UserId == 0).ToListAsync();
            await db.Logs.OrderByDescending(s => s.LogId).ToListAsync();
             
        });

        app.MapPost("api/notifications/set", async (StudyDb db, Notification notification) =>
        {
            var foundNotifications = (notification.CourseId > 0 ? 
                db.Notifications.SingleOrDefault(s => s.CourseId == notification.CourseId) : 
                db.Notifications.SingleOrDefault(s => s.CourseFileId == notification.CourseFileId));
            if (foundNotifications is null) {
                notification.NotificationId = Interlocked.Increment(ref globalNotificationID);
                notification.UserId = 0;
                await db.Notifications.AddAsync(notification);
                await db.SaveChangesAsync();
                return Results.Created($"/", notification);
            } else {
                var notificationToDelete = await db.Notifications.FindAsync(foundNotifications.NotificationId);
                db.Notifications.Remove(notificationToDelete);
                await db.SaveChangesAsync();
                return Results.Ok();
            };
        });
    }
}







