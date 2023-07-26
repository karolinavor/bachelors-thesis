using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public int CourseFileId { get; set; }
    }
}

