using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Models 
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string Type { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public User User { get; set; }
        public string DatePublished { get; set; }
    }

    class CommentDb : DbContext
    {
        public CommentDb(DbContextOptions options) : base(options) { }
        public DbSet<Comment> Comments { get; set; } = null!;
    }
}

