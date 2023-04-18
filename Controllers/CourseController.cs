using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{
    private readonly ILogger<CourseController> _logger;

    public CourseController(ILogger<CourseController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public Course Get()
    {
        return new Course
        {
            Id = 1,
            Title = "Informacni technologie",
            Short = "INFT",
            Files = Enumerable.Range(1, 5).Select(index => new File
            {
                Id = index,
                Name = "Soubor"
            })
        };
    }
}

