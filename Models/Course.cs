using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Models 
{
    public class Course 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Short { get; set; }
        public IEnumerable<CourseFile> Files { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
    }

    public class CourseDb : DbContext
    {
        public CourseDb(DbContextOptions options) : base(options) { }
        public DbSet<Course> Courses { get; set; } = null!;
    }
}