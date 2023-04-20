using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ILogger<CommentController> _logger;

    public CommentController(ILogger<CommentController> logger)
    {
        _logger = logger;
    }

    [HttpGet("latest")]
    public IEnumerable<Comment> GetLatest()
    {
        return Enumerable.Range(1, 4).Select(index => new Comment
        {
            Id = index,
            CommentText = "Test comment course",
            Type = "Course",
            TypeId = 1,
            TypeName = "KMI",
            Author = "Karolina Nova",
            DatePublished = "1.1. 2023"
        })
        .ToArray();
    }
}

