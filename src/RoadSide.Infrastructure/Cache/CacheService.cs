using System.Text.Json;
using RoadSide.Domain.Cache;
using StackExchange.Redis;

namespace RoadSide.Infrastructure.Cache;

internal class CacheService : ICache
{
    private readonly IDatabase _redis;

    public CacheService(IConnectionMultiplexer muxer)
    {
        _redis = muxer.GetDatabase();
    }

    // Retrieve from cache or create if it doesn't exist
    public async Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> retrieveDataFunc, TimeSpan? slidingExpiration = null)
    {
        // Try to get data from cache
        var cachedData = await _redis.StringGetAsync(cacheKey);

        if (!cachedData.IsNullOrEmpty)
        {
            // Deserialize the cached data to the required type
            return JsonSerializer.Deserialize<T>(cachedData);
        }

        // Cache miss, so retrieve the data using the provided function
        var data = await retrieveDataFunc();

        // Serialize the data
        var serializedData = JsonSerializer.Serialize(data);

        // Set data in cache with optional sliding expiration
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
            return JsonSerializer.Deserialize<T>(cachedData);
        }

        // Return default if no data found in cache
        return default(T);
    }
}