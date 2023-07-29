using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
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
        public int LogId { get; set; }
        public int UserId { get; set; }
        public LogEvent Event { get; set; }
        public DateTime DateAdded { get; set; }
        public int CourseId { get; set; }
        public int CourseFileId { get; set; }
        public int CommentId { get; set; }
        public int NewsId { get; set; }
    }
}

