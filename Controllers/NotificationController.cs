using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class NotificationController
{
    public static void MapNotificationControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/notifications/get", async (StudyDb db) =>
        {
            var notifications = await db.Notifications.Where(s => s.UserID == 0).ToListAsync();
            await db.Logs.OrderByDescending(s => s.LogID).ToListAsync();
             
        });

        app.MapPost("api/notifications/set", async (StudyDb db, Notification notification) =>
        {
            var foundNotifications = (notification.CourseID > 0 ? 
                db.Notifications.SingleOrDefault(s => s.CourseID == notification.CourseID) : 
                db.Notifications.SingleOrDefault(s => s.CourseFileID == notification.CourseFileID));
            if (foundNotifications is null) {
                notification.UserID = 0;
                await db.Notifications.AddAsync(notification);
                await db.SaveChangesAsync();
                return Results.Created($"/", notification);
            } else {
                var notificationToDelete = await db.Notifications.FindAsync(foundNotifications.NotificationID);
                db.Notifications.Remove(notificationToDelete);
                await db.SaveChangesAsync();
                return Results.Ok();
            };
        });
    }
}







