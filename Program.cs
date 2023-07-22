using bachelor_thesis.Controllers;
using bachelor_thesis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<CourseDb>(options => options.UseInMemoryDatabase("items"));
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Bachelors thesis API",
            Version = "v1"
        });
    }
);

var app = builder.Build();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.MapCourseControllerRoutes();
app.MapCommentControllerRoutes();
app.MapCourseFileControllerRoutes();
app.MapNewsControllerRoutes();
app.MapUserControllerRoutes();

app.Run();