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
using Microsoft.Graph;
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

        app.MapGet("api/login",  () =>
        {}).RequireAuthorization();
        
        app.MapGet("api/signin-oidc", async (HttpRequest request) =>
        {
            Results.Ok(request);
        }).RequireAuthorization();
    }
}








