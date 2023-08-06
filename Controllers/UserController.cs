using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Claims;
using BachelorsThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorsThesis.Database;
using System.Security.Principal;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;

namespace BachelorsThesis.Controllers;

public static class UserController
{
    class result {
        public User user;
    }
    
    public static void MapUserControllerRoutes(this WebApplication app)
    {
        app.MapGet("api/user", async (StudyDb db, HttpContext context) =>
        {
            var usr = context.User;
            var email = usr.FindFirstValue("preferred_username");
            var user = db.Users.SingleOrDefault(u => u.Email == email);
            if (user is null) return Results.NotFound();
            var admin = usr.FindFirstValue("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
                if (admin == "Role.Admin") {
                    user.IsAdmin = true;
                } else {
                    user.IsAdmin = false;
                }

            var comments = db.Comments.Where(u => u.UserID == user.UserID).OrderByDescending(s => s.DateAdded);
            foreach (var comment in comments)
            {
                comment.Likes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Like).Count();
                comment.Dislikes = db.Reactions.Where(s => s.CommentID == comment.CommentID && s.ReactionType == ReactionType.Dislike).Count();
                var reacted = db.Reactions.SingleOrDefault(s => s.UserID == user.UserID && s.CommentID == comment.CommentID);
                if (reacted != null) {
                    if (reacted.ReactionType == ReactionType.Like) {
                        comment.Reacted = ReactedType.Liked;
                    } else {
                        comment.Reacted = ReactedType.Disliked;
                    }
                } else {
                    comment.Reacted = ReactedType.None;
                }
            }
            var files = db.CourseFiles.Where(u => u.UserID == user.UserID).OrderByDescending(s => s.DateAdded);
            
            var result = new {
                user,
                comments,
                files
            };
            await db.SaveChangesAsync();
            return Results.Ok(result);
        }).RequireAuthorization();

        app.MapGet("api/user/{userID}/get", async (StudyDb db, int userID, HttpContext context) =>
        {
            var user = db.Users.SingleOrDefault(u => u.UserID == userID);
            if (user is null) return Results.NotFound();
            return Results.Ok(user);
        }).RequireAuthorization();

        app.MapGet("api/login", async (HttpContext context, StudyDb db) =>
        {
            var usr = context.User;
            var email = usr.FindFirstValue("preferred_username");
            
            var existingUser = db.Users.SingleOrDefault(u => u.Email == email);
            if (existingUser is null)
            {
                var newUser = new User();
                newUser.Username = usr.FindFirstValue("name");
                newUser.Email = usr.FindFirstValue("preferred_username");
                var admin = usr.FindFirstValue("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
                if (admin == "Role.Admin") {
                    newUser.IsAdmin = true;
                } else {
                    newUser.IsAdmin = false;
                }
                await db.Users.AddAsync(newUser);
                await db.SaveChangesAsync();
            };

            return Results.Redirect("/dashboard");
        }).RequireAuthorization();

        app.MapPost("api/logout", async (HttpContext context) =>
        {
            await context.SignOutAsync("Cookies");
            await context.SignOutAsync("OpenIdConnect");
        }).RequireAuthorization();

        app.MapGet("api/user/loggedin", async (HttpContext context) =>
        {
            var usr = context.User.FindFirstValue("name");
            if (usr is null) return Results.Ok("false");
            return Results.Ok("true");
        });
    }
}








