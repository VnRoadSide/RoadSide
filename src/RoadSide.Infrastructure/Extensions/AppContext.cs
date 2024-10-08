using Microsoft.AspNetCore.Http;
using System.Security.Claims; // For accessing user claims
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;

namespace RoadSide.Infrastructure.Extensions;

public class AppContext(IHttpContextAccessor httpContextAccessor) : IAppContext
{
    // Fetch UserId directly from HttpContext claims
    public Guid UserId
    {
        get
        {
            var userIdClaim = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
            {
                return userId;
            }
            throw new Exception("User ID not found or invalid.");
        }
    }

    public ICollection<OrderItem> Cart => new List<OrderItem>();
    public ICollection<Orders> Checkout { get; set; } = new List<Orders>();
}