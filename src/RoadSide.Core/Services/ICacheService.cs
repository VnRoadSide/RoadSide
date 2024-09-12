namespace RoadSide.Core.Services;

public interface ICacheService
{
    Task<T> GetOrCreateAsync<T>(
        string cacheKey,
        Func<Task<T>> retrieveDataFunc,
        TimeSpan? slidingExpiration = null);
    Task InvalidateAsync<T>(
        string cacheKey);
    T Get<T>(string key);
}