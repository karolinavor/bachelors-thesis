using System.Net;
using BachelorsThesis.Controllers;
using BachelorsThesis.Database;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Study") ?? "Data Source=Study.db";

builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
        builder =>
        {
            builder.WithOrigins("https://localhost:44424",
                "https://localhost:44424");
            builder.WithOrigins("https://localhost:44424",
                "https://login.microsoftonline.com");
            builder.WithOrigins("localhost:44424",
                "http://localhost:44424");
            builder.WithOrigins(
                "https://login.microsoftonline.com").AllowAnyMethod()
                .AllowAnyHeader();;
        });
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardLimit = 2;
    options.KnownProxies.Add(IPAddress.Parse("127.0.10.1"));
});

builder.Services.AddControllersWithViews(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddRazorPages()
    .AddMicrosoftIdentityUI();

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSqlite<StudyDb>(connectionString);
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
    app.UseSwagger();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

 app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});

app.UseCors("MyPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.MapCourseControllerRoutes();
app.MapCommentControllerRoutes();
app.MapCourseFileControllerRoutes();
app.MapNewsControllerRoutes();
app.MapUserControllerRoutes();
app.MapNotificationControllerRoutes();
app.MapLogControllerRoutes();
app.MapReactionControllerRoutes();

if (!Directory.Exists("./FileSystem")) {
    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "./","FileSystem"));
}

app.Run();