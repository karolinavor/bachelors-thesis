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
                Name = "Soubor",
                Author = "Karolina Nova",
                DatePublished = "12.2.2023",
                Filetype = "pdf",
                Url = "",
                Thumbnail = "",
                Size = "32MB",
                Likes = 10,
                Dislikes = 2,
                NumberOfDownloads = 12
            }),
            Comments = Enumerable.Range(1, 3).Select(index => new Comment
            {
                Id = index,
                CommentText = "Test comment course",
                Type = "Course",
                TypeId = 1,
                TypeName = "KMI",
                Author = "Karolina Nova",
                DatePublished = "1.1. 2023"
            })
        };
    }

    [HttpGet("list")]
    public IEnumerable<Course> GetList()
    {
        return Enumerable.Range(1, 5).Select(index => new Course
        {
            Id = index,
            Title = "Nahodny predmet",
            Short = "TEST"
        })
        .ToArray();
    }

    [HttpGet("comments")]
    public IEnumerable<Comment> GetComments()
    {
        return Enumerable.Range(1, 3).Select(index => new Comment
        {
            Id = index,
            CommentText = "Test comment",
            Type = "File",
            TypeId = 1,
            TypeName = "KMI",
            Author = "Karolina Vorlickova",
            DatePublished = "1.1. 2023"
        })
        .ToArray();
    }

    [HttpGet("latest")]
    public IEnumerable<Course> GetLatest()
    {
        return Enumerable.Range(1, 5).Select(index => new Course
        {
            Id = index,
            Title = "Nahodny predmet",
            Short = "TEST"
        })
        .ToArray();
    }

    /*
    [HttpPost("add")]
    public Course PostAdd()
    {
        
    }

    [HttpPut("edit")]
    public Course PutEdit()
    {
        
    }
    */
}

