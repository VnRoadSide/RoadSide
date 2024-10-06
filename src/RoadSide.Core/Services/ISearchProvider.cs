using RoadSide.Domain;

namespace RoadSide.Core.Services;
public interface ISearchProvider
{
    Task IndexAsync<T>(IEnumerable<T> items) where T : class;
    Task IndexAsync(Type type, IEnumerable<object> data);
    Task<SearchResult<T>> SearchAsync<T>(string query, SearchOptions options = null);
    Task UpdateAsync<T>(IEnumerable<T> items);
    Task DeleteAsync<T>(IEnumerable<string> objectIds);
    Task ReIndexOperationsAsync<T>(IEnumerable<T> items) where T : class;
}

public class SearchOptions
{
    /// <summary>
    /// The page number to retrieve (zero-based).
    /// </summary>
    public int Page { get; set; } = 0;

    /// <summary>
    /// The number of hits to return per page.
    /// </summary>
    public int HitsPerPage { get; set; } = 20;

    /// <summary>
    /// List of attributes to retrieve.
    /// </summary>
    public IEnumerable<string> AttributesToRetrieve { get; set; }

    /// <summary>
    /// List of attributes to highlight.
    /// </summary>
    public IEnumerable<string> AttributesToHighlight { get; set; }

    /// <summary>
    /// The facets to retrieve.
    /// </summary>
    public IEnumerable<string> Facets { get; set; }

    /// <summary>
    /// The filters to apply to the search.
    /// </summary>
    public string Filters { get; set; }

    /// <summary>
    /// Custom parameters specific to the search provider.
    /// </summary>
    public Dictionary<string, object> CustomParameters { get; set; }
}

