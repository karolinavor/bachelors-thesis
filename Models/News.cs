using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class News
    {
        public int NewsId { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }
    }
}