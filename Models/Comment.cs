using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string Type { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public User User { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseId { get; set; }
        public int FileId { get; set; }
    }
}

