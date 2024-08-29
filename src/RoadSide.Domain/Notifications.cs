// Notification.cs
// Copyright (c) 2019-2022.

namespace RoadSide.Domain;

public class Notifications : BaseEntity<Guid>, IMessaging<User>
{
    public DateTime CreatedOn { get; set; }
    public User From { get; set; }
    public User To { get; set; }
    public string Content { get; set; }
}
