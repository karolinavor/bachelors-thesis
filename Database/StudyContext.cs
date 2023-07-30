using BachelorThesis.Models;
using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Database
{
  public class StudyDb : DbContext
  {
    public StudyDb(DbContextOptions options) : base(options) { }

    public DbSet<Course> Courses { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; }
    public DbSet<CourseFile> CourseFiles { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Log> Logs { get; set; }
    public DbSet<Reaction> Reactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Course>().ToTable("Course");
      modelBuilder.Entity<Comment>().ToTable("Comment");
      modelBuilder.Entity<CourseFile>().ToTable("CourseFile");
      modelBuilder.Entity<News>().ToTable("News");
      modelBuilder.Entity<User>().ToTable("User");
      modelBuilder.Entity<Notification>().ToTable("Notification");
      modelBuilder.Entity<Log>().ToTable("Log");
      modelBuilder.Entity<Reaction>().ToTable("Reaction");

      modelBuilder.Entity<Course>().Property(f => f.CourseID).ValueGeneratedOnAdd();
      modelBuilder.Entity<Comment>().Property(f => f.CommentID).ValueGeneratedOnAdd();
      modelBuilder.Entity<CourseFile>().Property(f => f.CourseFileID).ValueGeneratedOnAdd();
      modelBuilder.Entity<News>().Property(f => f.NewsID).ValueGeneratedOnAdd();
      modelBuilder.Entity<User>().Property(f => f.UserID).ValueGeneratedOnAdd();
      modelBuilder.Entity<Notification>().Property(f => f.NotificationID).ValueGeneratedOnAdd();
      modelBuilder.Entity<Log>().Property(f => f.LogID).ValueGeneratedOnAdd();
      modelBuilder.Entity<Reaction>().Property(f => f.ReactionID).ValueGeneratedOnAdd();
    }
  }
}