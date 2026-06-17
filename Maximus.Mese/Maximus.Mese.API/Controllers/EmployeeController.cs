using Maximus.Mese.APIFramework.Helper;
using Maximus.Mese.APIFramework.Models;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Maximus.Mese.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetEmployees()
        {
            DataSet ds = SqlDbHelper.GetData("employee");

            var employees =
                StronglyTypedDataSetHelper
                    .ToList<Employee>(ds);

            return Ok(employees);
        }

        [HttpGet("dynamic")]
        public IActionResult GetEmployeesDynamic()
        {
            DataSet ds = SqlDbHelper.GetData("employee");

            var employees =
                DynamicDataSetHelper
                    .ToList(ds);

            return Ok(employees);
        }
    }
}
