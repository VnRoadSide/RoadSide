namespace RoadSide.Domain.Media;

// In your Domain project
public class FileResource: IDisposable
{
    public string FileName { get; set; }
    public Stream Content { get; set; }
    public string ContentType { get; set; }
    public long Length { get; set; }
    
    // Dispose the stream when done
    public void Dispose()
    {
        Content?.Dispose();
    }
}
