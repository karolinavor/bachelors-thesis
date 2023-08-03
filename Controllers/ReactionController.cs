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
            if (reaction.CommentID > 0) {
                var foundReaction = db.Reactions.SingleOrDefault(s => s.UserID == 0 && s.CommentID == reaction.CommentID);
                if (foundReaction is null) {
                    reaction.DateAdded = DateTime.Now;
                    reaction.UserID = 0;
                    reaction.ReactionType = ReactionType.Like;
                    await db.Reactions.AddAsync(reaction);
                    await db.SaveChangesAsync();
                    return Results.Created($"/", reaction);
                } else {
                    if (foundReaction.ReactionType == ReactionType.Like) {
                        db.Reactions.Remove(foundReaction);
                    } else {
                        foundReaction.ReactionType = ReactionType.Like;
                    }
                    await db.SaveChangesAsync();
                    return Results.Ok();
                }
            } else if (reaction.CourseFileID > 0) {
                var foundReaction = db.Reactions.SingleOrDefault(s => s.UserID == 0 && s.CourseFileID == reaction.CourseFileID);
                if (foundReaction is null) {
                    reaction.DateAdded = DateTime.Now;
                    reaction.UserID = 0;
                    reaction.ReactionType = ReactionType.Like;
                    await db.Reactions.AddAsync(reaction);
                    await db.SaveChangesAsync();
                    return Results.Created($"/", reaction);
                } else {
                    if (foundReaction.ReactionType == ReactionType.Like) {
                        db.Reactions.Remove(foundReaction);
                    } else
                    {
                        foundReaction.ReactionType = ReactionType.Like;
                    }
                    await db.SaveChangesAsync();
                    return Results.Ok();
                }
            }
            return Results.Ok();
        }).RequireAuthorization();

        app.MapPost("api/dislike/add", async (StudyDb db, Reaction reaction) =>
        {
            if (reaction.CommentID > 0) {
                var foundReaction = db.Reactions.SingleOrDefault(s => s.UserID == 0 && s.CommentID == reaction.CommentID);
                if (foundReaction is null) {
                    reaction.DateAdded = DateTime.Now;
                    reaction.UserID = 0;
                    reaction.ReactionType = ReactionType.Dislike;
                    await db.Reactions.AddAsync(reaction);
                    await db.SaveChangesAsync();
                    return Results.Created($"/", reaction);
                } else {
                    if (foundReaction.ReactionType == ReactionType.Dislike) {
                        db.Reactions.Remove(foundReaction);
                    } else {
                        foundReaction.ReactionType = ReactionType.Dislike;
                    }
                    await db.SaveChangesAsync();
                    return Results.Ok();
                }
            } else if (reaction.CourseFileID > 0) {
                var foundReaction = db.Reactions.SingleOrDefault(s => s.UserID == 0 && s.CourseFileID == reaction.CourseFileID);
                if (foundReaction is null) {
                    reaction.DateAdded = DateTime.Now;
                    reaction.UserID = 0;
                    reaction.ReactionType = ReactionType.Dislike;
                    await db.Reactions.AddAsync(reaction);
                    await db.SaveChangesAsync();
                    return Results.Created($"/", reaction);
                } else {
                    if (foundReaction.ReactionType == ReactionType.Dislike) {
                        db.Reactions.Remove(foundReaction);
                    } else {
                        foundReaction.ReactionType = ReactionType.Dislike;
                    }
                    await db.SaveChangesAsync();
                    return Results.Ok();
                }
            }
            return Results.Ok();
        }).RequireAuthorization();
    }
}