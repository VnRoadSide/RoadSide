using Algolia.Search.Clients;
using RoadSide.Core.Services;
using RoadSide.Domain;

namespace RoadSide.Infrastructure.Search;

public class AlgoliaService(SearchClient client, ISettingService settingService) : ISearchProvider
{
    private readonly TimeSpan _reindexInterval = TimeSpan.FromHours(1);
    private const string Prefix = "ReindexStatus_{0}";

    public async Task IndexAsync<T>(IEnumerable<T> items) where T : class
    {
        var indexName = typeof(T).Name.ToLowerInvariant();
        await client.SaveObjectsAsync(indexName, items);
    }

    public async Task IndexAsync(Type type, IEnumerable<object> data)
    {
        var indexName = type.Name.ToLowerInvariant();

        var objects = data.Select(item =>
        {
            var dict = item.ToDictionary();

            // Ensure 'objectID' is set
            if (!dict.ContainsKey("objectID"))
            {
                // Try to get 'Id' property from item
                var idProperty = item.GetType().GetProperty("Id");

                if (idProperty != null)
                {
                    var idValue = idProperty.GetValue(item)?.ToString();
                    dict["objectID"] = idValue;
                }
                else
                {
                    throw new InvalidOperationException($"Item of type {item.GetType().Name} does not have an 'Id' property for 'objectID'.");
                }
            }

            return dict;
        }).ToList();

        // Save objects to Algolia
        await client.SaveObjectsAsync(indexName, objects);

        // Wait for the indexing task to complete
    }


    public async Task<SearchResult<T>> SearchAsync<T>(string query, SearchOptions options = null)
    {
        var indexName = typeof(T).Name.ToLowerInvariant();
        var response = await client.SearchSingleIndexAsync<T>(indexName);
        
        return new SearchResult<T>
        {
            Hits = response.Hits,
            TotalHits = response.NbHits,
            Page = response.Page,
            HitsPerPage = response.HitsPerPage,
            TotalPages = response.NbPages,
            Facets = response.Facets?.ToDictionary(
                facet => facet.Key,
                facet => facet.Value.Keys.AsEnumerable()
            ),
            AdditionalData = new Dictionary<string, object>
            {
                { "ProcessingTimeMS", response.ProcessingTimeMS }
            }
        };
    }

    public async Task UpdateAsync<T>(IEnumerable<T> items)
    {
        var objects = new List<Dictionary<string, object>>();
        var indexName = typeof(T).Name.ToLowerInvariant();

        foreach (var item in items)
        {
            var dictionary = item.ToDictionary(); // Assuming you have a method to convert T to Dictionary
            objects.Add(dictionary);
        }

        var batchResponse = await client.SaveObjectAsync(indexName, objects);
        await client.WaitForTaskAsync(indexName, batchResponse.TaskID);
    }

    public async Task DeleteAsync<T>(IEnumerable<string> objectIds)
    {
        var indexName = typeof(T).Name.ToLowerInvariant();

        var objectIDs = objectIds.ToList();

        await client.DeleteObjectsAsync(indexName, objectIDs);
    }

    public async Task ReIndexOperationsAsync<T>(IEnumerable<T> items) where T : class
    {
        var referenceKey = string.Format(Prefix, typeof(T).Name.ToLowerInvariant());
        var reindexStatus = await settingService.GetAsync(referenceKey);
        if (reindexStatus == null || DateTime.UtcNow - reindexStatus.LastModifiedOn > _reindexInterval)
        {
            try
            {
                // Replace all objects to prevent duplication
                var indexName = typeof(T).Name.ToLowerInvariant();
                await client.ReplaceAllObjectsAsync(indexName, items);
                await settingService.UpsertByKeyAsync(new AppSettings
                {
                    ReferenceKey= referenceKey,
                    Value = OperationResult.Success.ToString(),
                    Type = nameof(OperationResult)
                });
            }
            catch (Exception e)
            {
                await settingService.UpsertByKeyAsync(new AppSettings
                {
                    ReferenceKey= referenceKey,
                    Value = OperationResult.Failure.ToString(),
                    Type = nameof(OperationResult),
                    Description = e.Message
                });
            }
        }
    }

}