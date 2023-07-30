﻿using BachelorThesis.Models;
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
        });

        app.MapPost("api/course/add", async (StudyDb db, Course course) =>
        {
            course.DateAdded = DateTime.Now;
            course.UserID = 0;
            course.NotificationSet = false;
            await db.Courses.AddAsync(course);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CourseAdded;
            log.DateAdded = DateTime.Now;
            log.CourseID = course.CourseID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Created($"/course/{course.CourseID}", course);
        });

        app.MapPut("api/course/{ID}/edit", async (StudyDb db, Course updatedCourse, int ID) =>
        {
            var course = await db.Courses.FindAsync(ID);
            if (course is null) return Results.NotFound();
            course.Title = updatedCourse.Title;
            course.Short = updatedCourse.Short;

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CourseEdited;
            log.DateAdded = DateTime.Now;
            log.CourseID = course.CourseID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });
        
        app.MapDelete("api/course/{ID}/delete", async (StudyDb db, int ID) =>
        {
            var course = await db.Courses.FindAsync(ID);
            if (course is null)
            {
                return Results.NotFound();
            }
            db.Courses.Remove(course);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CourseDeleted;
            log.DateAdded = DateTime.Now;
            log.CourseID = course.CourseID;
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

