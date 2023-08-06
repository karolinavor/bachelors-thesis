using Microsoft.EntityFrameworkCore;

namespace BachelorsThesis.Models 
{
    public enum LogEvent 
    {
        CourseAdded,
        CourseEdited,
        CourseDeleted,
        CourseFileAdded,
        CourseFileDeleted,
        NewsAdded,
        NewsEdited,
        NewsDeleted,
        CommentAdded,
        CommentDeleted
    }

    public class Log
    {
        public int LogID { get; set; }
        public int UserID { get; set; }
        public LogEvent Event { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseID { get; set; }
        public int CourseFileID { get; set; }
        public int CommentID { get; set; }
        public int NewsID { get; set; }
        public bool Read { get; set; }
    }
}

