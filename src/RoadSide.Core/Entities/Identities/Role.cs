
using System.ComponentModel.DataAnnotations;

namespace RoadSide.Core.Entities;

public class Role
{
    public Guid Id { get; set; }
    [MaxLength(Int16.MaxValue)]
    public string? Name { get; set; }
    [MaxLength(Int16.MaxValue)]
    public string? NormalizedName { get; set; }

    public ICollection<RoleClaims> Claims { get; set; } = [];
    public ICollection<UserRole> UserRoles { get; set; } = [];
}