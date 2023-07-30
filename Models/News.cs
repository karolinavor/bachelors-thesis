using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class News
    {
        public int NewsID { get; set; }
        public int UserID { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }
    }
}