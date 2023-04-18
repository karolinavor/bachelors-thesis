using Microsoft.AspNetCore.Mvc;

namespace bachelor_thesis.Controllers;

[ApiController]
[Route("[controller]")]
public class NewsController : ControllerBase
{
    private readonly ILogger<NewsController> _logger;

    public NewsController(ILogger<NewsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<News> Get()
    {
        return Enumerable.Range(1, 2).Select(index => new News
        {
            Id = index,
            Date = "26.09.2022",
            Content = "Bylo zprovozněno přihlašování k portalu pomocí SSO (Single sign-on). Prosíme studenty, aby přednostně využívali tento typ přihlašování. Přihlašování na portal pomocí jména a hesla bude do budoucna zrušeno."
        })
        .ToArray();
    }
}

