using Microsoft.EntityFrameworkCore;

namespace BachelorThesis.Models 
{
    public class Notification
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public int CourseFileID { get; set; }
    }
}

