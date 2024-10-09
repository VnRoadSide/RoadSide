// Notification.cs
// Copyright (c) 2019-2022.

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadSide.Core.Entities;

public class Notifications
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public DateTime CreatedOn { get; set; }
    
    [ForeignKey("To")]
    public Guid ToId { get; set; }
    public virtual required User To { get; set; }

    [MaxLength(Int16.MaxValue)] 
    public string Content { get; set; } = string.Empty;

    [MaxLength(Int16.MaxValue)] 
    public string? Url { get; set; }
    public bool IsPersonal { get; set; }
}
