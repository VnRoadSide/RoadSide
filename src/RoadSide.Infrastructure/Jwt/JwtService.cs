using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using RoadSide.Core.Entities;
using RoadSide.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RoadSide.Infrastructure.Extensions;

namespace RoadSide.Infrastructure.Jwt
{
    public class JwtService : IJwtService
    {
        private readonly IUserClaimsPrincipalFactory<User> _claimsPrincipal;
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<User> _UserManager;
        private readonly IMapper _mapper;

        public JwtService(IUserClaimsPrincipalFactory<User> claimsPrincipal, IOptions<JwtSettings> jwtSettings, UserManager<User> UserManager, IMapper mapper)
        {
            _claimsPrincipal = claimsPrincipal;
            _jwtSettings = jwtSettings.Value;
            _UserManager = UserManager;
            _mapper = mapper;
        }

        public async ValueTask<Token> GenerateTokenAsync(User entity)
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

        private async Task<IEnumerable<Claim>> _getClaimsAsync(User User)
        {
            var result = await _claimsPrincipal.CreateAsync(User);
            return result.Claims;
        }

        public async ValueTask<Token> GenerateTokenFromUserName(string userName)
        {
            var User = await _UserManager.FindByNameAsync(userName);
            if (User == null)
            {
                throw new ArgumentException("Invalid user name", nameof(userName));
            }

            return await GenerateTokenAsync(User);
        }
    }
}