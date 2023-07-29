using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseFileController
{

    public static int globalCourseFileID;

    public static void MapCourseFileControllerRoutes(this WebApplication app)
    {    
        app.MapGet("api/file/{fileId}/get", async (StudyDb db, int fileId) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileId);
            if (courseFile is null) return Results.NotFound();
            var notificationSet = db.Notifications.SingleOrDefault(s => s.CourseFileId == fileId);
            if (notificationSet != null) {
                courseFile.NotificationSet = true;
            } else {
                courseFile.NotificationSet = false;
            }
            return Results.Ok(courseFile);
        });

        app.MapPost("api/course/{courseId}/file/add", async (StudyDb db, int courseId, HttpContext httpContext, HttpRequest request) =>
        {
            var courseFile = new CourseFile();
            courseFile.CourseFileId = Interlocked.Increment(ref globalCourseFileID);
            courseFile.DateAdded = DateTime.Now;
            courseFile.CourseId = courseId;
            courseFile.Name = httpContext.Request.Form["name"];
            courseFile.UserId = Int32.Parse(httpContext.Request.Form["userId"]);
            courseFile.Size = Int32.Parse(httpContext.Request.Form["size"]);
            courseFile.Filetype = httpContext.Request.Form["filetype"];
            courseFile.NotificationSet = false;
            courseFile.Url = $"FileSystem/course_{courseId}/file_{courseFile.CourseId}.{courseFile.Filetype}";
            courseFile.NumberOfDownloads = 0;
            db.CourseFiles.Add(courseFile);
            
            if (!Directory.Exists("FileSystem/course_{courseId}/")) {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "FileSystem",$"course_{courseId}"));
            }

            var courseFolder = $"FileSystem/course_{courseId}/";
            var folder = Path.Combine(Directory.GetCurrentDirectory(), courseFolder);
            var postedFileName = $"file_{courseFile.CourseId}.{courseFile.Filetype}";
            var finalPath = Path.Combine(folder, postedFileName);
            using var fs = File.OpenWrite(finalPath);
            await request.Form.Files[0].CopyToAsync(fs);

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CourseFileAdded;
            log.DateAdded = DateTime.Now;
            log.CourseFileId = courseFile.CourseFileId;
            await db.Logs.AddAsync(log);
            
            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseId}/file/{courseFile.CourseId}", courseFile);
        });

        app.MapGet("api/file/{fileId}/download", async (StudyDb db, int fileId) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileId);
            if (courseFile is null) return Results.NotFound();
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url)))
            {
                courseFile.NumberOfDownloads = courseFile.NumberOfDownloads + 1;
                await db.SaveChangesAsync();
                return Results.File(Path.Combine(Directory.GetCurrentDirectory(), courseFile.Url));
            }
            else
            {
                return Results.NotFound();
            }
        });

        app.MapDelete("api/file/{fileId}/delete", async (StudyDb db, int fileId) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileId);
            if (courseFile is null) return Results.NotFound();
            db.CourseFiles.Remove(courseFile);
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url))) {
                File.Delete(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url));
            }

            var log = new Log();
            log.LogId = Interlocked.Increment(ref LogController.globalLogID);
            log.UserId = 0;
            log.Event = LogEvent.CourseFileDeleted;
            log.DateAdded = DateTime.Now;
            log.CourseFileId = courseFile.CourseFileId;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/course/{courseId}/files", async (StudyDb db, int courseId) =>
        {
            var courseFiles = db.CourseFiles.Where(s => s.CourseId == courseId).OrderByDescending(s => s.DateAdded);
            if (courseFiles is null) return Results.NotFound();
            return Results.Ok(courseFiles);
        });

        app.MapGet("api/files/latest", async (StudyDb db) =>
        {
            return await db.CourseFiles.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}





