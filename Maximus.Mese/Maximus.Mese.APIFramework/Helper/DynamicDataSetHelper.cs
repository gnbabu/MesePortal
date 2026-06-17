using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Dynamic;

namespace Maximus.Mese.APIFramework.Helper
{

    public static class DynamicDataSetHelper
    {
        public static List<dynamic> ToList(DataSet ds)
        {
            if (ds == null || ds.Tables.Count == 0)
                return new List<dynamic>();

            return ToList(ds.Tables[0]);
        }

        public static List<dynamic> ToList(DataTable table)
        {
            var result = new List<dynamic>();

            foreach (DataRow row in table.Rows)
            {
                IDictionary<string, object> item =
                    new ExpandoObject();

                foreach (DataColumn column in table.Columns)
                {
                    item[column.ColumnName] =
                        row[column] == DBNull.Value
                            ? null
                            : row[column];
                }

                result.Add(item);
            }

            return result;
        }

        public static dynamic ToObject(DataSet ds)
        {
            return ToList(ds).FirstOrDefault();
        }
    }
}
