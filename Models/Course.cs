using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public string Short { get; set; }
        public DateTime DateAdded { get; set; }
    }
}