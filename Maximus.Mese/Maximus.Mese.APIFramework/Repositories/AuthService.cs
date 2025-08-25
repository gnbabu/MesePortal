using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Maximus.Mese.APIFramework.Interfaces;
using Maximus.Mese.APIFramework.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Maximus.Mese.APIFramework.Repositories
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AuthService> _logger;
        public AuthService(IConfiguration configuration,
            IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }
        public async Task<AuthResponse> Login(LoginModel loginModel)
        {
            try
            {
                // Validate user credentials
                var user = await _userRepository.ValidateUserAsync(loginModel);

                // Check if user exists
                if (user == null)
                {
                    return new AuthResponse { StatusCode = 0, Message = "Invalid username or password" };
                }

                // Check if the user is active
                if (!user.IsActive)
                {
                    return new AuthResponse { StatusCode = 0, Message = "User is inactive" };
                }

                // Create the claims for the JWT token
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                // Generate the token
                var token = GenerateToken(authClaims);

                // Return successful response with user and token
                return new AuthResponse { StatusCode = 1, Message = "Login successful", User = user, Token = token };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login failed for user {Username}", loginModel.UserName);
                return new AuthResponse { StatusCode = 0, Message = "An error occurred during login" };
            }
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            //To DO Expire token should be changed
            var secretKey = _configuration["JWTKey:Secret"] ?? throw new InvalidOperationException("JWT secret key not configured.");

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var _TokenExpiryTimeInHour = Convert.ToInt64(_configuration["JWTKey:TokenExpiryTimeInHour"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWTKey:ValidIssuer"],
                Audience = _configuration["JWTKey:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(_TokenExpiryTimeInHour),
                //Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
