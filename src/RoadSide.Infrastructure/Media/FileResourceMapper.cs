using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using RoadSide.Domain.Media;

namespace RoadSide.Infrastructure.Media;

public static class FileResourceMapper
{
    public static Resource ToResource(IFormFile formFile)
    {
        if (formFile is not { Length: > 0 }) return null;

        // Initialize contentType with the formFile's ContentType
        string contentType = formFile.ContentType;

        // If ContentType is application/octet-stream, try to determine the actual content type
        if (contentType == "application/octet-stream")
        {
            // Create an instance of FileExtensionContentTypeProvider
            var provider = new FileExtensionContentTypeProvider();

            // Try to get the content type from the file extension
            if (!provider.TryGetContentType(formFile.FileName, out string inferredContentType))
            {
                // Could not determine the content type, default to application/octet-stream
                inferredContentType = "application/octet-stream";
            }

            contentType = inferredContentType;
        }

        // Create the FileResource with the (possibly updated) contentType
        var fileResource = new FileResource
        {
            FileName = formFile.FileName,
            Content = formFile.OpenReadStream(),
            ContentType = contentType,
            Length = formFile.Length
        };

        // Determine the media type based on the (updated) ContentType
        if (contentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
        {
            return new ImageResource(fileResource);
        }
        else if (contentType.StartsWith("video/", StringComparison.OrdinalIgnoreCase))
        {
            return new VideoResource(fileResource);
        }
        else
        {
            throw new InvalidOperationException("Unsupported media type.");
        }
    }
}