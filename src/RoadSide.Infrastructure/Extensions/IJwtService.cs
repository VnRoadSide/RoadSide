using RoadSide.Core.Entities;
using RoadSide.Core.Models;

namespace RoadSide.Infrastructure.Extensions;

public interface IJwtService
{
    ValueTask<Token> GenerateTokenFromUserName(string userName);
    ValueTask<Token> GenerateTokenAsync(User entity);
    ValueTask<Token> GenerateTokenAsyncUser(RoadSide.Domain.User user);
}