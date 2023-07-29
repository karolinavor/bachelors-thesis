using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public enum ReactionType
    {
        Like,
        Dislike
    }

    public class Reaction
    {
        public int ReactionId { get; set; }
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseFileId { get; set; }
        public int CommentId { get; set; }
        public ReactionType ReactionType { get; set; }
    }
}

