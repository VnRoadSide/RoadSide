using RoadSide.Domain;
using RoadSide.Domain.Media;

namespace RoadSide.Core.Services;

public interface IMediaService
{
    Task<string> UploadAsync(Resource resource);
    Task<bool> DeleteAsync(string publicId, MediaType mediaType);
}