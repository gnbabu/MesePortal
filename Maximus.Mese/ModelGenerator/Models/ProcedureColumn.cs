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

        public Type DataType { get; set; }

        public bool IsNullable { get; set; }
    }

    public class ResultSetInfo
    {
        public int ResultSetNumber { get; set; }

        public List<ProcedureColumn> Columns { get; set; }= new();
    }

    public class ParameterInfo
    {
        public string Name { get; set; }

        public string SqlType { get; set; }
    }
}
