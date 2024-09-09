namespace RoadSide.Domain;

public class PagingResult<TDomain> where TDomain: class
{
    public ICollection<TDomain> Data { get; set; }
    public int Total { get; set; }
}