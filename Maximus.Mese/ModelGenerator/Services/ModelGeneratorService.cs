using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModelGenerator.Helpers;
using ModelGenerator.Models;

namespace ModelGenerator.Services
{
    public class ModelGeneratorService
    {
        public string BuildClassName(
            string procedureName)
        {
            var name = procedureName;

            name = name.Replace("dbo.", "");

            if (name.StartsWith("usp_"))
                name = name.Substring(4);

            return $"{name}Model";
        }

        public string GenerateClass(
              string className,
              List<ProcedureColumn> columns)
        {
            var sb = new StringBuilder();

            sb.AppendLine("namespace GeneratedModels;");
            sb.AppendLine();

            sb.AppendLine($"public class {className}");
            sb.AppendLine("{");

            foreach (var column in columns)
            {
                var type = SqlTypeMapper.GetType(
                    column.SqlTypeId,
                    column.IsNullable);

                sb.AppendLine(
                    $"    public {type} {column.ColumnName} {{ get; set; }}");
            }

            sb.AppendLine("}");

            return sb.ToString();
        }
    }
}

