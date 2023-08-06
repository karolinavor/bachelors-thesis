using Microsoft.EntityFrameworkCore;

namespace BachelorsThesis.Models 
{ 
    public class CourseFile
    {
        public int CourseFileID { get; set; }
        public string Name { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public DateTime DateAdded { get; set; }
        public string Filetype { get; set; }
        public int Size { get; set; }
        public string Url { get; set; }
        public int NumberOfDownloads { get; set; }
        public int CourseID { get; set; }
        public bool NotificationSet { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public ReactedType Reacted { get; set; }
        public string Description { get; set; }
    }
}