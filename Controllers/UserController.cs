﻿using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

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
        });
    }
}







