using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RoadSide.Core.Services;
using RoadSide.Domain;
using RoadSide.Infrastructure.Extensions;
using User = RoadSide.Core.Entities.User;

namespace RoadSide.Infrastructure.Jwt
{
    public class JwtService : IJwtService
    {
        private readonly IUserClaimsPrincipalFactory<User> _claimsPrincipal;
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ICacheService _cacheService;

        public JwtService(IUserClaimsPrincipalFactory<User> claimsPrincipal, IOptions<JwtSettings> jwtSettings, UserManager<User> userManager, IMapper mapper, ICacheService cacheService)
        {
            _claimsPrincipal = claimsPrincipal;
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        private async ValueTask<Token> GenerateTokenAsync(User entity)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = await _getClaimsAsync(entity);
            var descriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                IssuedAt = DateTime.Now,
                NotBefore = DateTime.Now.AddMinutes(0),
                Expires = DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                SigningCredentials = credentials,
                Subject = new ClaimsIdentity(claims)
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var securityToken = tokenHandler.CreateJwtSecurityToken(descriptor);

            return new Token
            {
                AccessToken = tokenHandler.WriteToken(securityToken),
                ExpiresIn = (int)securityToken.ValidTo.Subtract(DateTime.Now).TotalSeconds
            };
        }

        public async ValueTask<Token> GenerateTokenAsyncUser(RoadSide.Domain.User user)
        {
            var result = await GenerateTokenAsync(_mapper.Map<User>(user));
            return result;
        }


        public ValueTask<bool> RevokeTokenAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
            {
                throw new ArgumentException("Invalid JWT token", nameof(token));
            }

            var jwtToken = handler.ReadJwtToken(token);
            var expirationTime = jwtToken.ValidTo;

            if (expirationTime <= DateTime.UtcNow)
            {
                // Token has already expired
                return new ValueTask<bool>(false);
            }

            var cacheKey = $"revoked_tokens:{token}";
            var slidingExpiration = expirationTime - DateTime.UtcNow;

            // Store the token in the cache with expiration matching the token's expiry
            _cacheService.GetOrCreateAsync(cacheKey, () => Task.FromResult(true), slidingExpiration);

            return new ValueTask<bool>(true);
        }

        private async Task<IEnumerable<Claim>> _getClaimsAsync(User user)
        {
            var result = await _claimsPrincipal.CreateAsync(user);
            return result.Claims;
        }

        public async ValueTask<Token> GenerateTokenFromUserName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new ArgumentException("Invalid user name", nameof(userName));
            }

            return await GenerateTokenAsync(user);
        }
    }
}