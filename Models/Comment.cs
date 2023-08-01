using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public enum ReactedType
    {
        None,
        Liked,
        Disliked
    }
    
    public class Comment
    {
        public int CommentID { get; set; }
        public string CommentText { get; set; }
        public int UserID { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseID { get; set; }
        public int CourseFileID { get; set; }
        public string CategoryName { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public ReactedType Reacted { get; set; }
    }
}

