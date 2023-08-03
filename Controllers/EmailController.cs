using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class EmailController
{
    public static void MapEmailControllerRoutes(this WebApplication app)
    {    
        /*
        private readonly IEmailService _emailService;
        private readonly ILogger<EmailController> _logger;
        public EmailController(IEmailService emailService,
            ILogger<EmailController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }
    
        app.MapGet("api/email", () =>
        {
            await _emailService.SendEmailAsync("email@email.com", "Some subject", "Specify the html content here");
            return Result.Ok();
        });
        */
    }
}