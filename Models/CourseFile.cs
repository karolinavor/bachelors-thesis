using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class CourseFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public DateTime DateAdded { get; set; }
        public string Filetype { get; set; }
        public int Size { get; set; }
        public string Url { get; set; }
        /*
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        */
        public int NumberOfDownloads { get; set; }
        public int CourseId { get; set; }
    }
}