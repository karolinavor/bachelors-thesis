using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class CourseFile
    {
        public int CourseFileId { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public DateTime DateAdded { get; set; }
        public string Filetype { get; set; }
        public int Size { get; set; }
        public string Url { get; set; }
        public int NumberOfDownloads { get; set; }
        public int CourseId { get; set; }
        public bool NotificationSet { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public bool Reacted { get; set; }
    }
}