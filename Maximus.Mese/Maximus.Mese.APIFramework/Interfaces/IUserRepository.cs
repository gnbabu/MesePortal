using Maximus.Mese.APIFramework.Models;

namespace Maximus.Mese.APIFramework.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int userId);
        Task<User> ValidateUserAsync(LoginModel loginModel);
        Task<UserPermissionsResponse> GetUserRolesPermissionsAsync(int userId);
    }
}
