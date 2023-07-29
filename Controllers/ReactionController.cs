using BachelorThesis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BachelorThesis.Database;

namespace BachelorThesis.Controllers;

public static class ReactionController
{

    public static int globalReactionID;

    public static void MapReactionControllerRoutes(this WebApplication app)
    {
        app.MapPost("api/like/add", async (StudyDb db, Reaction reaction) =>
        {
            reaction.ReactionId = Interlocked.Increment(ref globalReactionID);
            reaction.DateAdded = DateTime.Now;
            reaction.UserId = 0;
            reaction.ReactionType = ReactionType.Like;

            await db.Reactions.AddAsync(reaction);
            await db.SaveChangesAsync();
            return Results.Created($"/", reaction);
        });

        app.MapPost("api/dislike/add", async (StudyDb db, Reaction reaction) =>
        {
            reaction.ReactionId = Interlocked.Increment(ref globalReactionID);
            reaction.DateAdded = DateTime.Now;
            reaction.UserId = 0;
            reaction.ReactionType = ReactionType.Dislike;

            await db.Reactions.AddAsync(reaction);
            await db.SaveChangesAsync();
            return Results.Created($"/", reaction);
        });
    }
}