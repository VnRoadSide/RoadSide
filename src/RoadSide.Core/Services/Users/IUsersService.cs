
using RoadSide.Domain;

namespace RoadSide.Core.Services.Users;
using Domain;

public interface IUsersService
{
    ValueTask<ICollection<User>> GetAllAsync();
    ValueTask<User> GetById(Guid id);
    ValueTask<User> GetById(BaseEntity<Guid> id);
    ValueTask UpdateAsync(ICollection<User> users);
    ValueTask RemoveAsync(Guid id);
}