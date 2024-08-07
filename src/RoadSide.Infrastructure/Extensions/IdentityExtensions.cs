using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace RoadSide.Infrastructure.Extensions;

public static class IdentityExtensions
{
    public static string GetUserId(this HttpContext httpContext)
    {
        if (httpContext.User?.Identity?.IsAuthenticated != true) return null;
        // RWM: If it's still null after you call this method then there is a problem somewhere else on the stack.
        return httpContext.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
    }
}