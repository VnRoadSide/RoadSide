// Notification.cs
// Copyright (c) 2019-2022.

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

public class Notifications
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public DateTime CreatedOn { get; set; }
    
    [ForeignKey("From")]
    public Guid FromId { get; set; }
    public virtual UserRole FromUserRole { get; set; }
    
    [ForeignKey("To")]
    public Guid ToId { get; set; }
    public virtual UserRole ToUserRole { get; set; }

    [MaxLength(Int16.MaxValue)] 
    public string Content { get; set; } = string.Empty;
}
