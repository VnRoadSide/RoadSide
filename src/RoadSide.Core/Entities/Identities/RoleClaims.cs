using Microsoft.AspNetCore.Identity;

namespace RoadSide.Core.Entities;

public class RoleClaims : IdentityRoleClaim<Guid>
{
    public DateTimeOffset CreatedClaim { get; set; } = DateTimeOffset.Now;
    public virtual Role? Role { get; set; }
}