using System.Security.Claims;
using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseController
{
    public static void MapCourseControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/course/{courseID}/get", async (StudyDb db, int courseID) =>
        {
            var course = await db.Courses.FindAsync(courseID);
            if (course is null) return Results.NotFound();
            var notificationSet = db.Notifications.SingleOrDefault(s => s.CourseID == courseID);
            if (notificationSet != null) {
                course.NotificationSet = true;
            } else {
                course.NotificationSet = false;
            }
            return Results.Ok(course);
        }).RequireAuthorization();

        app.MapPost("api/course/add", async (StudyDb db, Course course, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            course.DateAdded = DateTime.Now;
            course.UserID = user.UserID;
            course.NotificationSet = false;
            await db.Courses.AddAsync(course);
            await db.SaveChangesAsync();

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CourseAdded;
            log.DateAdded = DateTime.Now;
            log.CourseID = course.CourseID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.CourseID}", course);
        }).RequireAuthorization();

        app.MapPut("api/course/{ID}/edit", async (StudyDb db, Course updatedCourse, int ID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var course = await db.Courses.FindAsync(ID);
            if (course is null) return Results.NotFound();
            course.Title = updatedCourse.Title;
            course.Short = updatedCourse.Short;

            var log = new Log();
            log.UserID = user.UserID;
            log.Event = LogEvent.CourseEdited;
            log.DateAdded = DateTime.Now;
            log.CourseID = course.CourseID;
            log.Read = false;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();
        
        app.MapDelete("api/course/{courseID}/delete", async (StudyDb db, int courseID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.Email == context.User.FindFirstValue("preferred_username"));
            if (user is null) return Results.NotFound();

            var course = await db.Courses.FindAsync(courseID);
            if (course is null)
            {
                return Results.NotFound();
            }

            var comments = db.Comments.Where(s => s.CourseID == courseID);
            foreach (var comment in comments) {
                db.Comments.Remove(comment);
            }

            var files = db.CourseFiles.Where(s => s.CourseID == courseID);
            foreach (var file in files)
            {
                var fileComments = db.Comments.Where(s => s.CourseFileID == file.CourseFileID);
                foreach (var fileComment in fileComments) {
                    db.Comments.Remove(fileComment);
                }
                db.CourseFiles.Remove(file);
            }

            var logs = db.Logs.Where(s => s.CourseID == courseID);
            foreach (var log in logs) {
                db.Logs.Remove(log);
            }

            db.Courses.Remove(course);
            await db.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("api/courses", async (StudyDb db) =>
        {
            return await db.Courses.OrderBy(s => s.Short).ToListAsync();
        }).RequireAuthorization();

        app.MapGet("api/courses/latest", async (StudyDb db) =>
        {
            return await db.Courses.OrderByDescending(s => s.DateAdded).Take(10).ToListAsync();
        }).RequireAuthorization();
    }
}

