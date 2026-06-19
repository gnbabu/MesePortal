using System.Text;
using ModelGenerator.Models;

namespace ModelGenerator.Services
{
    public class ModelGeneratorService
    {
        public Dictionary<string, string> GenerateModels(
            string baseModelName,
            List<ResultSetInfo> resultSets)
        {
            var files =
                new Dictionary<string, string>();

            foreach (var resultSet in resultSets)
            {
                string className =
                    resultSets.Count == 1
                    ? baseModelName
                    : $"{baseModelName}Result{resultSet.ResultSetNumber}";

                var sb = new StringBuilder();

                sb.AppendLine("namespace GeneratedModels;");
                sb.AppendLine();

                sb.AppendLine($"public class {className}");
                sb.AppendLine("{");

                foreach (var column in resultSet.Columns)
                {
                    var type =
                        GetTypeName(
                            column.DataType,
                            column.IsNullable);

                    sb.AppendLine(
                        $"    public {type} {column.ColumnName} {{ get; set; }}");
                }

                sb.AppendLine("}");

                files.Add(
                    $"{className}.cs",
                    sb.ToString());
            }

            return files;
        }

        private string GetTypeName(
            Type type,
            bool nullable)
        {
            string name;

            if (type == typeof(int))
                name = "int";
            else if (type == typeof(long))
                name = "long";
            else if (type == typeof(short))
                name = "short";
            else if (type == typeof(decimal))
                name = "decimal";
            else if (type == typeof(double))
                name = "double";
            else if (type == typeof(float))
                name = "float";
            else if (type == typeof(bool))
                name = "bool";
            else if (type == typeof(DateTime))
                name = "DateTime";
            else if (type == typeof(Guid))
                name = "Guid";
            else if (type == typeof(byte[]))
                name = "byte[]";
            else
                name = "string";

            if (nullable &&
                name != "string" &&
                name != "byte[]")
            {
                name += "?";
            }

            return name;
        }

      
    }
}