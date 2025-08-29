using Maximus.Mese.APIFramework.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Maximus.Mese.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserRepository userRepository, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        /// <summary>
        /// Get user with roles and permissions by userId
        /// </summary>
        [HttpGet("{userId}/permissions")]
        public async Task<IActionResult> GetUserPermissions(int userId)
        {
            try
            {
                var response = await _userRepository.GetUserRolesPermissionsAsync(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred while fetching permissions for userId {UserId}", userId);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An unexpected error occurred." });
            }
        }

        /// <summary>
        /// Get only user details
        /// </summary>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred while fetching user {UserId}", userId);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "An unexpected error occurred." });
            }
        }
    }
}