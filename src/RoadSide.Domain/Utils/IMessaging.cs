namespace RoadSide.Domain;

public interface IMessaging<TKey>
{
  DateTime CreatedOn { get; set; }
  TKey From { get; set; }
  TKey To { get; set; }
  string Content { get; set; }
}