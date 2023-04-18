using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseListController : ControllerBase
{
    private readonly ILogger<CourseListController> _logger;

    public CourseListController(ILogger<CourseListController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Course> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Course
        {
            Id = index,
            Title = "Nahodny predmet",
            Short = "TEST"
        })
        .ToArray();
    }
}

