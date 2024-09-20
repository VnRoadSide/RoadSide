using System.Text.Json;
using AutoMapper;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;

public interface ISettingService : IService<Domain.AppSettings, Entities.AppSettings>
{
    Result<T> GetAsync<T>(string referenceKey);
    ValueTask<ICollection<Domain.AppSettings>> GetAllAsync();
}

internal class SettingService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.AppSettings, Entities.AppSettings>(context, mapper), ISettingService
{
    private readonly IMapper _mapper = mapper;

    public Result<T> GetAsync<T>(string referenceKey)
    {
        if (string.IsNullOrEmpty(referenceKey))
        {
            return Result<T>.Failure("Reference key cannot be null or empty.");
        }
        
        try
        {
            var entity = GetQueryable().FirstOrDefault(x => x.ReferenceKey == referenceKey);
            if (entity == null)
                return Result<T>.Failure($"Setting with key '{referenceKey}' was not found.");

            // Handle primitive types
            if (typeof(T) == typeof(int))
            {
                return int.TryParse(entity.Value, out int intValue) ? Result<T>.Success((T)(object)intValue) : Result<T>.Failure($"Cannot convert value '{entity.Value}' to int.");
            }

            if (typeof(T) == typeof(bool))
            {
                return bool.TryParse(entity.Value, out bool boolValue) ? Result<T>.Success((T)(object)boolValue) : Result<T>.Failure($"Cannot convert value '{entity.Value}' to bool.");
            }

            if (typeof(T) == typeof(string))
            {
                return Result<T>.Success((T)(object)entity.Value);
            }

            // For complex types, attempt to deserialize the JSON
            var deserializedValue = JsonSerializer.Deserialize<T>(entity.Value);
            return deserializedValue == null ? Result<T>.Failure($"Deserialized value is null for key '{referenceKey}'.") : Result<T>.Success(deserializedValue);

        }
        catch (JsonException ex)
        {
            return Result<T>.Failure($"Error deserializing value: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result<T>.Failure($"An error occurred while getting the setting: {ex.Message}");
        }
    }

    public ValueTask<ICollection<Domain.AppSettings>> GetAllAsync()
    {
        return new ValueTask<ICollection<Domain.AppSettings>>(_mapper.Map<ICollection<Domain.AppSettings>>(GetQueryable().ToList()));
    }
}