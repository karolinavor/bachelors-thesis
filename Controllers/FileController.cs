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
    public IEnumerable<File> Get()
    {
        return Enumerable.Range(1, 2).Select(index => new File
        {
            Id = index,
            Name = "Soubor",
        })
        .ToArray();
    }
}

