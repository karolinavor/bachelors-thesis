using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseId { get; set; }
        public int FileId { get; set; }
        public string CategoryName { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
    }
}

