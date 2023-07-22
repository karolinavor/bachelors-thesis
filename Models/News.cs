using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Models 
{
    public class News
    {
        public int Id { get; set; }

        public string Date { get; set; }

        public string Content { get; set; }
    }

    public class NewsDb : DbContext
    {
        public NewsDb(DbContextOptions options) : base(options) { }
        public DbSet<News> News { get; set; } = null!;
    }
}