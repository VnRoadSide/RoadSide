namespace RoadSide.Domain;

public interface INotifier
{
  DateTime CreatedOn { get; set; }
  string Content { get; set; }
}