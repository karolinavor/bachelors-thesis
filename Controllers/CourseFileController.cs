using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class CourseFileController
{
    public static void MapCourseFileControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/file/latest", async (StudyDb db) =>
        {
            return await db.CourseFiles.OrderByDescending(s => s.DateAdded).Take(5).ToListAsync();
        });
        
        app.MapGet("api/file/{fileId}", async (StudyDb db, int fileId) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileId);
            if (courseFile is null) return Results.NotFound();
            return Results.Ok(courseFile);
        });

        app.MapGet("api/file/{fileId}/download", async (StudyDb db, int fileId) =>
        {
            var courseFile = await db.CourseFiles.FindAsync(fileId);
            if (courseFile is null) return Results.NotFound();
            if (File.Exists(Path.Combine(Directory.GetCurrentDirectory(),courseFile.Url)))
            {
                var file = File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), courseFile.Url));
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

            Console.Write(courseFile.Url);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapPost("api/course/{courseId}/file/add", async (StudyDb db, int courseId, HttpContext httpContext, HttpRequest request) =>
        {
            Random rnd = new Random();

            var courseFile = new CourseFile();
            courseFile.Id = rnd.Next(100);
            courseFile.DateAdded = DateTime.Now;
            courseFile.CourseId = courseId;
            courseFile.Name = httpContext.Request.Form["name"];
            courseFile.Author = httpContext.Request.Form["author"];
            courseFile.Size = Int32.Parse(httpContext.Request.Form["size"]);
            courseFile.Filetype = httpContext.Request.Form["filetype"];
            courseFile.Url = $"FileSystem/course_{courseId}/file_{courseFile.Id}.{courseFile.Filetype}";
            courseFile.NumberOfDownloads = 0;
            db.CourseFiles.Add(courseFile);
            
            if (!Directory.Exists("FileSystem/course_{courseId}/")) {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "FileSystem",$"course_{courseId}"));
            }

            var courseFolder = $"FileSystem/course_{courseId}/";
            var folder = Path.Combine(Directory.GetCurrentDirectory(), courseFolder);
            var postedFileName = $"file_{courseFile.Id}.{courseFile.Filetype}";
            var finalPath = Path.Combine(folder, postedFileName);
            using var fs = File.OpenWrite(finalPath);
            await request.Form.Files[0].CopyToAsync(fs);
            
            await db.SaveChangesAsync();
            return Results.Created($"/course/{courseId}/file/{courseFile.Id}", courseFile);
        });

        app.MapGet("api/course/{courseId}/files", async (StudyDb db, int courseId) =>
        {
            var courseFiles = db.CourseFiles.Where(s => s.CourseId == courseId);
            if (courseFiles is null) return Results.NotFound();
            return Results.Ok(courseFiles);
        });
    }
}





