namespace bachelor_thesis;

public class File
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Author { get; set; }
    public string DatePublished { get; set; }
    public string Filetype { get; set; }
    public string Size { get; set; }
    public string Url { get; set; }
    public string Thumbnail { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int NumberOfDownloads { get; set; }
    public IEnumerable<Comment> Comments { get; set; }
}

