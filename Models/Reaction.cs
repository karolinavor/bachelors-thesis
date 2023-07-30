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
        public int ReactionID { get; set; }
        public int UserID { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseFileID { get; set; }
        public int CommentID { get; set; }
        public ReactionType ReactionType { get; set; }
    }
}

