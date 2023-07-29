using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseController
{
    public static int globalCourseID;

    public static void MapCourseControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/course/{courseId}/get", async (StudyDb db, int courseId) =>
        {
            var course = await db.Courses.FindAsync(courseId);
            if (course is null) return Results.NotFound();
            var notificationSet = db.Notifications.SingleOrDefault(s => s.CourseId == courseId);
            if (notificationSet != null) {
                course.NotificationSet = true;
            } else {
                course.NotificationSet = false;
            }
            return Results.Ok(course);
        });

        app.MapPost("api/course/add", async (StudyDb db, Course course) =>
        {
            course.CourseId = Interlocked.Increment(ref globalCourseID);
            course.DateAdded = DateTime.Now;
            course.UserId = 0;
            course.NotificationSet = false;
            await db.Courses.AddAsync(course);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CourseAdded;
            log.DateAdded = DateTime.Now;
            log.CourseId = course.CourseId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.CourseId}", course);
        });

        app.MapPut("api/course/{id}/edit", async (StudyDb db, Course updatedCourse, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null) return Results.NotFound();
            course.Title = updatedCourse.Title;
            course.Short = updatedCourse.Short;

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CourseEdited;
            log.DateAdded = DateTime.Now;
            log.CourseId = course.CourseId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });
        
        app.MapDelete("api/course/{id}/delete", async (StudyDb db, int id) =>
        {
            var course = await db.Courses.FindAsync(id);
            if (course is null)
            {
                return Results.NotFound();
            }
            db.Courses.Remove(course);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CourseDeleted;
            log.DateAdded = DateTime.Now;
            log.CourseId = course.CourseId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/courses", async (StudyDb db) =>
        {
            return await db.Courses.OrderBy(s => s.Short).ToListAsync();
        });

        app.MapGet("api/courses/latest", async (StudyDb db) =>
        {
            return await db.Courses.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}

