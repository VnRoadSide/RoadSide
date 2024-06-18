
namespace RoadSide.Core.Entities;

public class Role
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public string NormalizedName { get; set; }

    public string ConcurrencyStamp { get; set; }
    public ICollection<RoleClaims> Claims { get; set;}
    public ICollection<UserRole> UserRoles { get; set; }
}