// Notification.cs
// Copyright (c) 2019-2022.

namespace RoadSide.Domain;

public class Notification: Notifier
{
    public bool IsPersonal { get; set; }
    public User To { get; set; }
}

public class Notifier : INotifier
{
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public string Content { get; set; }
    public string Url { get; set; }
}