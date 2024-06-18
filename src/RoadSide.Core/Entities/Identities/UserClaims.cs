using Microsoft.AspNetCore.Identity;

namespace RoadSide.Core.Entities;

public class UserClaims : IdentityUserClaim<Guid>
{
    public virtual User Identity { get; set; }
}