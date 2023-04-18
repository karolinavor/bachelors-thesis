namespace bachelor_thesis;

public class Course
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Short { get; set; }

    public IEnumerable<File> Files { get; set; }
}

