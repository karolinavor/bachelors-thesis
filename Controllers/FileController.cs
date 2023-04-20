using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class FileController : ControllerBase
{
    private readonly ILogger<FileController> _logger;

    public FileController(ILogger<FileController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public File Get()
    {
        return new File
        {
            Id = 1,
            Name = "Soubor",
            Author = "Alice Morley",
            DatePublished = "12.2.2023",
            Filetype = "pdf",
            Url = "",
            Thumbnail = "",
            Size = "32MB",
            Likes = 10,
            Dislikes = 2,
            NumberOfDownloads = 12,
            Comments = Enumerable.Range(1, 3).Select(index => new Comment
            {
                Id = index,
                CommentText = "Test comment",
                Type = "File",
                TypeId = 1,
                TypeName = "KMI",
                Author = "Karolina Vorlickova",
                DatePublished = "1.1. 2023"
            })
        };
    }

    [HttpGet("latest")]
    public IEnumerable<File> GetLatest()
    {
        return Enumerable.Range(1, 5).Select(index => new File
        {
            Id = 1,
            Name = "Soubor",
            Author = "Alice Morley",
            DatePublished = "12.2.2023",
            Filetype = "pdf",
            Url = "",
            Thumbnail = "",
            Size = "32MB",
            Likes = 10,
            Dislikes = 2,
            NumberOfDownloads = 12,
            Comments = Enumerable.Range(1, 3).Select(index => new Comment
            {
                Id = index,
                CommentText = "Test comment",
                Type = "File",
                TypeId = 1,
                TypeName = "KMI",
                Author = "Karolina Vorlickova",
                DatePublished = "1.1. 2023"
            })
        })
        .ToArray();
    }
}

