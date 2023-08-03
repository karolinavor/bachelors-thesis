using System.Net.Http.Headers;
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
        app.MapGet("api/user", () =>
        {
            return new User
            {
                UserID = 0,
                Name = "Karolina Vorlickova",
                Username = "test",
                Email = "test@test.cz"
            };
        }).RequireAuthorization();

        app.MapGet("api/login", (HttpContext context) =>
        {
            var usr = context.User;
            //return Results.Json(usr.Claims.Select(p => p.Value));
            return Results.Redirect("/dashboard");
        }).RequireAuthorization();

        app.MapPost("api/logout", async (HttpContext context) =>
        {
            await context.SignOutAsync("Cookies");
            await context.SignOutAsync("OpenIdConnect");
        }).RequireAuthorization();
    }
}








