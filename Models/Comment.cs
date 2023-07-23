using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string Author { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseId { get; set; }
        public int FileId { get; set; }
    }
}

