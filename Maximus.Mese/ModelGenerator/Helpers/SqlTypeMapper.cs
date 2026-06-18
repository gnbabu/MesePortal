using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelGenerator.Helpers
{
    public static class SqlTypeMapper
    {
        public static string GetType(
            int sqlTypeId,
            bool nullable)
        {
            var type = sqlTypeId switch
            {
                48 => "byte",
                52 => "short",
                56 => "int",
                127 => "long",

                104 => "bool",

                60 => "decimal",
                106 => "decimal",
                108 => "decimal",

                59 => "float",
                62 => "double",

                40 => "DateTime",
                42 => "DateTime",
                58 => "DateTime",
                61 => "DateTime",

                36 => "Guid",

                167 => "string",
                175 => "string",
                231 => "string",
                239 => "string",

                165 => "byte[]",
                173 => "byte[]",

                _ => "string"
            };

            if (nullable &&
                type != "string" &&
                type != "byte[]")
            {
                type += "?";
            }

            return type;
        }
    }
}
