using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using RoadSide.Core.Services;
using RoadSide.Domain;
using RoadSide.Domain.Media;
using Resource = RoadSide.Domain.Media.Resource;

namespace RoadSide.Infrastructure.Media;

internal class MediaService : IMediaService
{
    private readonly Cloudinary _cloudinary;

    public MediaService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<string> UploadAsync(Resource resource)
    {
        if (resource.File.Length <= 0) return null;

        await using var stream = resource.File.OpenReadStream();

        var uploadResult = resource switch
        {
            ImageResource imageResource => await UploadImageAsync(imageResource, stream),
            VideoResource videoResource => await UploadVideoAsync(videoResource, stream),
            _ => null
        };

        return uploadResult?.SecureUrl?.AbsoluteUri;
    }

    private async Task<UploadResult> UploadImageAsync(ImageResource imageResource, Stream stream)
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(imageResource.File.FileName, stream),
            Transformation = new Transformation()
                .Crop(imageResource.Crop)
                .Gravity(imageResource.Gravity)
                .Width(imageResource.Width)
                .Height(imageResource.Height)
        };

        return await _cloudinary.UploadAsync(uploadParams);
    }

    private async Task<UploadResult> UploadVideoAsync(VideoResource videoResource, Stream stream)
    {
        var uploadParams = new VideoUploadParams
        {
            File = new FileDescription(videoResource.File.FileName, stream),
            Transformation = new Transformation()
                .Width(videoResource.Width)
                .Height(videoResource.Height)
                .Crop(videoResource.Crop)
        };

        return await _cloudinary.UploadAsync(uploadParams);
    }

    public async Task<bool> DeleteAsync(string publicId, MediaType mediaType)
    {
        var deleteParams = new DeletionParams(publicId)
        {
            ResourceType = mediaType switch
            {
                MediaType.Image => ResourceType.Image,
                MediaType.Video => ResourceType.Video,
                _ => throw new ArgumentOutOfRangeException(nameof(mediaType), mediaType, null)
            }
        };

        var result = await _cloudinary.DestroyAsync(deleteParams);

        return result.Result == "ok";
    }
}
