using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Models 
{
    public class CourseFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string DatePublished { get; set; }
        public string Filetype { get; set; }
        public string Size { get; set; }
        public string Url { get; set; }
        public string Thumbnail { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int NumberOfDownloads { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
    }

    public class CourseFileDb : DbContext
    {
        public CourseFileDb(DbContextOptions options) : base(options) { }
        public DbSet<CourseFile> CourseFiles { get; set; } = null!;
    }
}