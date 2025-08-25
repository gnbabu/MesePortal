using System.Data;
using Maximus.Mese.APIFramework.Interfaces;
using Maximus.Mese.APIFramework.Models;
using Maximus.Mese.APIFramework.SQL;
using Maximus.Mese.Core.DBHelpers;
using Microsoft.Data.SqlClient;

namespace Maximus.Mese.APIFramework.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly SqlDataAccessHelper _sqlDataAccessHelper;

        public UserRepository(SqlDataAccessHelper sqlDataAccessHelper)
        {
            _sqlDataAccessHelper = sqlDataAccessHelper;
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserId", userId)
            };

            return await _sqlDataAccessHelper.ExecuteSingleAsync(SqlDbConstants.GetUserById, parameters, reader => new User
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                Email = reader.GetNullableString("Email"),
                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
            });
        }

        public async Task<User> ValidateUserAsync(LoginModel loginModel)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserName", loginModel.UserName),
                new SqlParameter("@Password", loginModel.Password)
            };

            return await _sqlDataAccessHelper.ExecuteSingleAsync(SqlDbConstants.ValidateUser, parameters, reader => new User
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                Email = reader.GetNullableString("Email"),
                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
            });
        }

        public async Task<UserPermissionsResponse> GetUserRolesPermissionsAsync(int userId)
        {
            var response = new UserPermissionsResponse();

            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
            };

            var ds = await _sqlDataAccessHelper.ExecuteDataSetAsync(SqlDbConstants.GetUserRolesPermissions, parameters);

            // Map User
            if (ds.Tables.Count >= 1 && ds.Tables[0].Rows.Count > 0)
            {
                var row = ds.Tables[0].Rows[0];
                response.User = new User
                {
                    UserId = (int)row["UserId"],
                    UserName = row["UserName"].ToString(),
                    Email = row["Email"].ToString(),
                    IsActive = (bool)row["IsActive"]
                };
            }

            // Map Roles
            if (ds.Tables.Count >= 2)
            {
                response.UserRoles = ds.Tables[1].AsEnumerable()
                    .Select(r => new Role   // <-- Use Role class here
                    {
                        RoleId = r.Field<int>("RoleId"),
                        RoleName = r.Field<string>("RoleName")
                    }).ToList();
            }

            // Map Permissions
            if (ds.Tables.Count >= 3)
            {
                response.Permissions = ds.Tables[2].AsEnumerable()
                    .Select(p => new Permission
                    {
                        PermissionId = p.Field<int>("PermissionId"),
                        Code = p.Field<string>("PermissionCode"),
                        Type = p.Field<string>("PermissionType")
                    }).ToList();
            }

            return response;
        }

    }
}
