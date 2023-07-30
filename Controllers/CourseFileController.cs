using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseFileController
{
    public static void MapCourseFileControllerRoutes(this WebApplication app)
    {    
        app.MapGet("api/file/{fileID}/get", async (StudyDb db, int fileID) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileID);
            if (courseFile is null) return Results.NotFound();
            var notificationSet = db.Notifications.SingleOrDefault(s => s.CourseFileID == fileID);
            if (notificationSet != null) {
                courseFile.NotificationSet = true;
            } else {
                courseFile.NotificationSet = false;
            }

            courseFile.Likes = db.Reactions.Where(s => s.CourseFileID == fileID && s.ReactionType == ReactionType.Like).Count();
            courseFile.Dislikes = db.Reactions.Where(s => s.CourseFileID == fileID && s.ReactionType == ReactionType.Dislike).Count();
            var reacted = db.Reactions.SingleOrDefault(s => s.UserID == 0 && s.CourseFileID == fileID);
            if (reacted != null) {
                courseFile.Reacted = true;
            } else {
                courseFile.Reacted = false;
            }

            return Results.Ok(courseFile);
        });

        app.MapPost("api/course/{courseID}/file/add", async (StudyDb db, int courseID, HttpContext httpContext, HttpRequest request) =>
        {
            var courseFile = new CourseFile();
            courseFile.DateAdded = DateTime.Now;
            courseFile.CourseID = courseID;
            courseFile.Name = httpContext.Request.Form["name"];
            courseFile.UserID = Int32.Parse(httpContext.Request.Form["userID"]);
            courseFile.Size = Int32.Parse(httpContext.Request.Form["size"]);
            courseFile.Filetype = httpContext.Request.Form["filetype"];
            courseFile.NotificationSet = false;
            courseFile.Url = $"FileSystem/course_{courseID}/file_{courseFile.CourseID}.{courseFile.Filetype}";
            courseFile.NumberOfDownloads = 0;
            db.CourseFiles.Add(courseFile);

            if (!Directory.Exists("FileSystem/course_{courseID}/")) {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "FileSystem",$"course_{courseID}"));
            }

            // TODO validovat soubory

            var courseFolder = $"FileSystem/course_{courseID}/";
            var folder = Path.Combine(Directory.GetCurrentDirectory(), courseFolder);
            var postedFileName = $"file_{courseFile.CourseID}.{courseFile.Filetype}";
            var finalPath = Path.Combine(folder, postedFileName);
            using var fs = File.OpenWrite(finalPath);
            await request.Form.Files[0].CopyToAsync(fs);

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CourseFileAdded;
            log.DateAdded = DateTime.Now;
            log.CourseFileID = courseFile.CourseFileID;
            await db.Logs.AddAsync(log);
            
            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseID}/file/{courseFile.CourseID}", courseFile);
        });

        app.MapGet("api/file/{fileID}/download", async (StudyDb db, int fileID) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileID);
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

        app.MapDelete("api/file/{fileID}/delete", async (StudyDb db, int fileID) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileID);
            if (courseFile is null) return Results.NotFound();
            db.CourseFiles.Remove(courseFile);
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url))) {
                File.Delete(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url));
            }

            var log = new Log();
            log.UserID = 0;
            log.Event = LogEvent.CourseFileDeleted;
            log.DateAdded = DateTime.Now;
            log.CourseFileID = courseFile.CourseFileID;
            await db.Logs.AddAsync(log);

            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapGet("api/course/{courseID}/files", async (StudyDb db, int courseID) =>
        {
            var courseFiles = db.CourseFiles.Where(s => s.CourseID == courseID).OrderByDescending(s => s.DateAdded);
            if (courseFiles is null) return Results.NotFound();
            return Results.Ok(courseFiles);
        });

        app.MapGet("api/files/latest", async (StudyDb db) =>
        {
            return await db.CourseFiles.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
    }
}





