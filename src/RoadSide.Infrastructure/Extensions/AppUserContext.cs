using Microsoft.AspNetCore.Http;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Infrastructure.Identity;

namespace RoadSide.Infrastructure.Extensions;

public class AppUserContext: IAppUserContext
{
    private IHttpContextAccessor _httpContextAccessor;
    private AppUserManager _userManager;

    public AppUserContext(IHttpContextAccessor httpContextAccessor, AppUserManager userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public User User => _userManager.GetDomainUserAsync(_httpContextAccessor.HttpContext?.User).GetAwaiter().GetResult();
    public List<OrderItem> Cart => new();
    public List<Orders> Checkout { get; set; } = new();
}