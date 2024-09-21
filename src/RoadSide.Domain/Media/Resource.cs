namespace RoadSide.Domain.Media;

public abstract class Resource(FileResource file, MediaType mediaType)
{
    public FileResource File { get; set; } = file;
    public MediaType MediaType { get; set; } = mediaType;
    public int Width { get; set; }
    public int Height { get; set; }
}

public class ImageResource : Resource
{
    public ImageResource(FileResource file) : base(file, MediaType.Image)
    {
        Crop = "fill";
        Gravity = "face";
        Width = 500;
        Height = 500;
    }

    public string Crop { get; set; }
    public string Gravity { get; set; }
}

public class VideoResource : Resource
{
    public VideoResource(FileResource file) : base(file, MediaType.Video)
    {
        Width = 1280;
        Height = 720;
        Crop = "limit";
    }

    public string Crop { get; set; }
}
