using System.Text.Json;
using System.Text.Json.Serialization;
using RoadSide.Core.Services;
using StackExchange.Redis;

namespace RoadSide.Infrastructure.Cache;

internal class CacheService : ICacheService
{
    private readonly IDatabase _redis;

    public CacheService(IConnectionMultiplexer muxer)
    {
        _redis = muxer.GetDatabase();
    }

    // Retrieve from cache or create if it doesn't exist
    public async Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> retrieveDataFunc, TimeSpan? slidingExpiration = null)
    {
        var cachedData = await _redis.StringGetAsync(cacheKey);

        if (!cachedData.IsNullOrEmpty)
        {
            return JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Handle object references
                PropertyNameCaseInsensitive = true // Handle property name case insensitivity if needed
            });
        }

        var data = await retrieveDataFunc();

        var serializedData = JsonSerializer.Serialize(data, new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
            PropertyNameCaseInsensitive = true
        });

        await _redis.StringSetAsync(cacheKey, serializedData, slidingExpiration);

        return data;
    }
    // Invalidate the cache by key
    public async Task InvalidateAsync<T>(string cacheKey)
    {
        await _redis.KeyDeleteAsync(cacheKey);
    }

    // Retrieve data directly from the cache
    public T Get<T>(string cacheKey)
    {
        var cachedData = _redis.StringGet(cacheKey);

        if (!cachedData.IsNullOrEmpty)
        {
            return JsonSerializer.Deserialize<T>(cachedData, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Handle object references
                PropertyNameCaseInsensitive = true // Ensure case-insensitive deserialization
            });
        }

        return default(T);
    }
}