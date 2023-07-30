using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ProfileImage { get; set; }
    }
}

