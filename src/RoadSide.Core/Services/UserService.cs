using AutoMapper;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface IUserService: IService<Domain.User, Entities.User>
{
    
}

internal class UserService(ICoreDbContext context, IMapper mapper)
    : Service<Domain.User, Entities.User>(context, mapper), IUserService;