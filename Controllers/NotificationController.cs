using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class NotificationController
{
    public static void MapNotificationControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/notifications/set/read", async (StudyDb db) =>
        {
            var unreadNotifications = db.Logs.Where(s => s.Read == false);
            foreach (var unreadNotification in unreadNotifications)
            {
                unreadNotification.Read = true;
            }
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/notifications/get", async (StudyDb db) =>
        {
            List<Log> userNotifications = new List<Log>();
            
            var filteredNotifications = db.Notifications.Where(s => s.UserID == 0);
            foreach (var filteredNotification in filteredNotifications)
            {
                var courseID = filteredNotification.CourseID;
                var courseFileID = filteredNotification.CourseFileID;
                var dateAdded = filteredNotification.DateAdded;

                var logs = db.Logs.ToListAsync().Result;

                if (courseID > 0)
                {
                    userNotifications.AddRange(db.Logs
                        .Where(s => s.CourseID == courseID && s.Event == LogEvent.CommentAdded && s.DateAdded > dateAdded).ToListAsync().Result);
                    userNotifications.AddRange(db.Logs
                        .Where(s => s.CourseID == courseID && s.Event == LogEvent.CourseFileAdded && s.DateAdded > dateAdded));
                }
                else if (courseFileID > 0)
                {
                    userNotifications.AddRange(db.Logs
                        .Where(s => s.CourseFileID == courseFileID && s.Event == LogEvent.CommentAdded && s.DateAdded > dateAdded).ToListAsync()
                        .Result);
                }
            }

            return Results.Ok(userNotifications.OrderByDescending(s => s.DateAdded).Take(5));
        });

        app.MapPost("api/notifications/set", async (StudyDb db, Notification notification) =>
        {
            var foundNotifications = (notification.CourseID > 0 ? 
                db.Notifications.SingleOrDefault(s => s.CourseID == notification.CourseID) : 
                db.Notifications.SingleOrDefault(s => s.CourseFileID == notification.CourseFileID));
            if (foundNotifications is null) {
                notification.UserID = 0;
                notification.DateAdded = DateTime.Now;
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







