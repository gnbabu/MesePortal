using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maximus.Mese.APIFramework.Models
{
    public class UserPermissionsResponse
    {
        public User User { get; set; }
        public List<Role>? UserRoles { get; set; }
        public List<Permission>? Permissions { get; set; }
    }
}
