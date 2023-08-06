using Microsoft.EntityFrameworkCore;

namespace BachelorsThesis.Models 
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}

