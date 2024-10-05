using RoadSide.Core.Models;

namespace RoadSide.Infrastructure.Extensions;

public interface IJwtService
{
    ValueTask<Token> GenerateTokenFromUserName(string userName);
    ValueTask<Token> GenerateTokenAsyncUser(RoadSide.Domain.User user);
    ValueTask<bool> RevokeTokenAsync(string token);
}