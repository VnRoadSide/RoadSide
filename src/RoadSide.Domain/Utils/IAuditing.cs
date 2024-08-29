namespace RoadSide.Domain;

public interface IAuditing<TKey>
{
  DateTime CreatedOn { get; set; }
  TKey CreatedBy { get; set; }
  DateTime LastModifiedOn { get; set; }
  TKey LastModifiedBy { get; set; }
}