using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public User Get()
    {
         return new User
        {
            Id = 1,
            Name = "Karolina Vorlickova",
            Email = "test@test.cz"
        };
    }
}

