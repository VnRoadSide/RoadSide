namespace RoadSide.Domain.Fx;

public interface ITimestamp
{ 
    DateTime CreatedOn { get; set; }
    DateTime LastModifiedOn { get; set; }
}

public interface IActor<TKey>
{
    TKey CreatedBy { get; set; }
    TKey LastModifiedBy { get; set; }
}

public interface IAuditing<TKey> : ITimestamp, IActor<TKey>;