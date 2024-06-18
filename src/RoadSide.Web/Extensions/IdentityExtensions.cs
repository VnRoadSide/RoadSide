using System.Security.Claims;
using System.Security.Principal;

namespace RoadSide.Web.Extensions;

public static class IdentityExtensions
{

    public static string GetUserId(this IIdentity identity)
    {
        return (identity as ClaimsIdentity)?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}