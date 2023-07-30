using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class ReactionController
{
    public static void MapReactionControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/like/add", async (StudyDb db, Reaction reaction) =>
        {
            // TODO zkontrolovat, jestli uz reakce existuje a pak updatovat. Jinak vytvorit novou
            reaction.DateAdded = DateTime.Now;
            reaction.UserID = 0;
            reaction.ReactionType = ReactionType.Like;

            await db.Reactions.AddAsync(reaction);
            await db.SaveChangesAsync();
            return Results.Created($"/", reaction);
        });

        app.MapPost("api/dislike/add", async (StudyDb db, Reaction reaction) =>
        {
            // TODO zkontrolovat, jestli uz reakce existuje a pak updatovat. Jinak vytvorit novou
            //var reaction = await db.Reactions.Where(s => s.UserID == 0);
            reaction.DateAdded = DateTime.Now;
            reaction.UserID = 0;
            reaction.ReactionType = ReactionType.Dislike;

            await db.Reactions.AddAsync(reaction);
            await db.SaveChangesAsync();
            return Results.Created($"/", reaction);
        });
    }
}