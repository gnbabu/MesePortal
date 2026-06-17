using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maximus.Mese.APIFramework.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string Email { get; set; }

        public decimal Salary { get; set; }

        public int DepartmentId { get; set; }
    }

    public class Department
    {
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }
}
