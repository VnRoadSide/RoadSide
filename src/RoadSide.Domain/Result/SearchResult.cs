namespace RoadSide.Domain;

public class SearchResult<T>
{
    /// <summary>
    /// The list of records matching the search query.
    /// </summary>
    public IEnumerable<T> Hits { get; set; }

    /// <summary>
    /// The total number of records matching the search query.
    /// </summary>
    public int TotalHits { get; set; }

    /// <summary>
    /// The current page number (zero-based).
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// The number of hits returned per page.
    /// </summary>
    public int HitsPerPage { get; set; }

    /// <summary>
    /// The total number of pages available.
    /// </summary>
    public int TotalPages { get; set; }

    /// <summary>
    /// Facet counts and other metadata (optional).
    /// </summary>
    public Dictionary<string, IEnumerable<string>> Facets { get; set; }

    /// <summary>
    /// Any additional metadata or information.
    /// </summary>
    public Dictionary<string, object> AdditionalData { get; set; }
}
