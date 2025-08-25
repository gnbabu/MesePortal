using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maximus.Mese.APIFramework.Models
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public string Code { get; set; } = string.Empty;
        public string? Type { get; set; }

    }
    public class RolePermission
    {
        public int RoleId { get; set; }
        public Role? Role { get; set; }
        public int PermissionId { get; set; }
        public Permission? Permission { get; set; }
    }
}
