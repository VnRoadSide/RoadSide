using System.Security.Claims;
using RoadSide.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace RoadSide.Infrastructure.Identity;

public class AppUserClaimsPrincipleFactory: UserClaimsPrincipalFactory<User>
{
    public AppUserClaimsPrincipleFactory(UserManager<User> userManager, IOptions<IdentityOptions> optionsAccessor) : base(userManager, optionsAccessor)
    {
    }
    
    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
    {
        var claimsIdentity = await base.GenerateClaimsAsync(user);
        claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier,user.Id.ToString(),ClaimValueTypes.String));
        //claimsIdentity.AddClaim(new Claim(ClaimTypes.Email,user?.Email));
        claimsIdentity.AddClaim(new Claim(ClaimTypes.Name,user.UserName));
        // claimsIdentity.AddClaim(new Claim(ClaimTypes.MobilePhone,user.PhoneNumber));
        claimsIdentity.AddClaim(new Claim(ClaimTypes.UserData,user.Id.ToString(),ClaimValueTypes.String));
        //claimsIdentity.AddClaim(new Claim(ClaimTypes.Role,RoleManager.GetRoleNameAsync(user.Roles)));
            

        return claimsIdentity;
    }
}