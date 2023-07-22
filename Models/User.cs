using Microsoft.EntityFrameworkCore;

namespace bachelor_thesis.Models 
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ProfileImage { get; set; }
    }

    class UserDb : DbContext
    {
        public UserDb(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; } = null!;
    }
}

