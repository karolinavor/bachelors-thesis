using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Claims;
using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;
using System.Security.Principal;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;

namespace BachelorThesis.Controllers;

public static class UserController
{
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
            await db.SaveChangesAsync();
            return Results.Ok(user);
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








