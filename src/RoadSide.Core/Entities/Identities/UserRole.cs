﻿
namespace RoadSide.Core.Entities;

public class UserRole 
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public Guid RoleId { get; set; }

    public User? User { get; set; }

    public Role? Role { get; set; }

    public virtual ICollection<Notifications> Notification { get; set; } = [];
}