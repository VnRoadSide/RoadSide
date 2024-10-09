using System.Text.Json;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;
using RoadSide.Domain;

namespace RoadSide.Core.Services;

public interface ISettingService : IService<Domain.AppSettings, Entities.AppSettings>
{
    DataResult<T> GetAsync<T>(string referenceKey);
    ValueTask<AppSettings?> GetAsync(string referenceKey);
    ValueTask<ICollection<Domain.AppSettings>> GetAllAsync();

    ValueTask<AppSettings> UpsertByKeyAsync(AppSettings domain, CancellationToken cancellationToken = default);
}

internal class SettingService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.AppSettings, Entities.AppSettings>(context, mapper), ISettingService
{
    private readonly IMapper _mapper = mapper;

    public DataResult<T> GetAsync<T>(string referenceKey)
    {
        if (string.IsNullOrEmpty(referenceKey))
        {
            return DataResult<T>.Failure("Reference key cannot be null or empty.");
        }

        try
        {
            var entity = GetQueryable().FirstOrDefault(x => x.ReferenceKey == referenceKey);
            if (entity == null)
                return DataResult<T>.Failure($"Setting with key '{referenceKey}' was not found.");

            // Handle primitive types
            if (typeof(T) == typeof(int))
            {
                return int.TryParse(entity.Value, out int intValue)
                    ? DataResult<T>.Success((T)(object)intValue)
                    : DataResult<T>.Failure($"Cannot convert value '{entity.Value}' to int.");
            }

            if (typeof(T) == typeof(bool))
            {
                return bool.TryParse(entity.Value, out bool boolValue)
                    ? DataResult<T>.Success((T)(object)boolValue)
                    : DataResult<T>.Failure($"Cannot convert value '{entity.Value}' to bool.");
            }

            if (typeof(T) == typeof(string))
            {
                return DataResult<T>.Success((T)(object)entity.Value);
            }

            // For complex types, attempt to deserialize the JSON
            var deserializedValue = JsonSerializer.Deserialize<T>(entity.Value);
            return deserializedValue == null
                ? DataResult<T>.Failure($"Deserialized value is null for key '{referenceKey}'.")
                : DataResult<T>.Success(deserializedValue);
        }
        catch (JsonException ex)
        {
            return DataResult<T>.Failure($"Error deserializing value: {ex.Message}");
        }
        catch (Exception ex)
        {
            return DataResult<T>.Failure($"An error occurred while getting the setting: {ex.Message}");
        }
    }

    public ValueTask<AppSettings?> GetAsync(string referenceKey)
    {
        var entity = GetQueryable().FirstOrDefault(x => x.ReferenceKey == referenceKey);
        return ValueTask.FromResult(_mapper.Map<AppSettings?>(entity));
    }

    public ValueTask<ICollection<Domain.AppSettings>> GetAllAsync()
    {
        return new ValueTask<ICollection<Domain.AppSettings>>(
            _mapper.Map<ICollection<Domain.AppSettings>>(GetQueryable().ToList()));
    }

    public async ValueTask<AppSettings> UpsertByKeyAsync(AppSettings domain, CancellationToken cancellationToken = default)
    {
        var entity = await GetQueryable()
            .FirstOrDefaultAsync(x => x.ReferenceKey == domain.ReferenceKey, cancellationToken);

        if (entity is null)
        {
            return await AddAsync(domain, cancellationToken);
        }
        else
        {
            entity.Value = domain.Value;
            entity.LastModifiedOn = DateTime.UtcNow;
            entity.Description = domain.Description;
            await context.SaveChangesAsync(cancellationToken);
            return domain;
        }
    }

}