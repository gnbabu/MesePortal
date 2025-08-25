using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maximus.Mese.APIFramework.Models;

namespace Maximus.Mese.APIFramework.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> Login(LoginModel model);
    }
}
