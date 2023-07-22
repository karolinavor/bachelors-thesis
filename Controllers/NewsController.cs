using bachelor_thesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Controllers;

public static class NewsController
{
    public static void MapNewsControllerRoutes(this WebApplication app)
    {
        app.MapGet("/news", () =>
        {
            return Enumerable.Range(1, 2).Select(index => new News
            {
                Id = index,
                Date = "26.09.2022",
                Content = "Bylo zprovozněno přihlašování k portalu pomocí SSO (Single sign-on). Prosíme studenty, aby přednostně využívali tento typ přihlašování. Přihlašování na portal pomocí jména a hesla bude do budoucna zrušeno."
            })
            .ToArray();
        });
    }
}







