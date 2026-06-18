using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelGenerator.Models
{
    public class ProcedureColumn
    {
        public string ColumnName { get; set; }

        public int SqlTypeId { get; set; }

        public bool IsNullable { get; set; }
    }
}
