using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maximus.Mese.APIFramework.SQL
{
    public static class SqlDbConstants
    {
        public const string GetUserById = "[ohpnm].[usp_GetUserDetailsById]";
        public const string ValidateUser = "[ohpnm].[usp_ValidateUser]";
        public const string GetUserRolesPermissions = "[ohpnm].[usp_GetUserRolesPermissions]";
    }
}
