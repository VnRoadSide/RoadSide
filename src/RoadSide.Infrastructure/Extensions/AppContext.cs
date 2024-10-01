using Microsoft.AspNetCore.Http;
using RoadSide.Core.Extensions;
using RoadSide.Domain;
using RoadSide.Domain.Context;
using RoadSide.Infrastructure.Identity;

namespace RoadSide.Infrastructure.Extensions;

public class AppContext: IAppContext
{
    private IHttpContextAccessor _httpContextAccessor;
    private AppUserManager _userManager;

    public AppContext(IHttpContextAccessor httpContextAccessor, AppUserManager userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }
    public Guid UserId => User.Id;
    public User User => _userManager.GetDomainUserAsync(_httpContextAccessor.HttpContext?.User).GetAwaiter().GetResult();
    public ICollection<OrderItem> Cart => [];
    public ICollection<Orders> Checkout { get; set; } = [];
}