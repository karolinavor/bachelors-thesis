﻿using Microsoft.EntityFrameworkCore;

namespace BachelorsThesis.Models 
{
    public class Course
    {
        public int CourseID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Short { get; set; }
        public DateTime DateAdded { get; set; }
        public bool NotificationSet { get; set; }
    }
}