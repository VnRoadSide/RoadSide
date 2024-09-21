using Microsoft.AspNetCore.Http;
using RoadSide.Domain.Media;

namespace RoadSide.Infrastructure.Media;

public static class FileResourceMapper
{
    public static Resource ToResource(IFormFile formFile)
    {
        if (formFile is not { Length: > 0 }) return null;

        var fileResource = new FileResource
        {
            FileName = formFile.FileName,
            Content = formFile.OpenReadStream(),
            ContentType = formFile.ContentType,
            Length = formFile.Length
        };

        // Determine the media type based on ContentType
        if (formFile.ContentType.StartsWith("image/"))
        {
            return new ImageResource(fileResource);
        }
        else if (formFile.ContentType.StartsWith("video/"))
        {
            return new VideoResource(fileResource);
        }
        else
        {
            throw new InvalidOperationException("Unsupported media type.");
        }
    }
}

