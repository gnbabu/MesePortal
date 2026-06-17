using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Data;
using System.Reflection;

namespace Maximus.Mese.APIFramework.Helper
{
    

    public static class StronglyTypedDataSetHelper
    {
        private static readonly ConcurrentDictionary<Type, PropertyInfo[]>
            PropertyCache = new();

        public static List<T> ToList<T>(DataSet ds)
            where T : new()
        {
            if (ds == null || ds.Tables.Count == 0)
                return new List<T>();

            return ToList<T>(ds.Tables[0]);
        }

        public static List<T> ToList<T>(DataTable table)
            where T : new()
        {
            var result = new List<T>();

            var properties = PropertyCache.GetOrAdd(
                typeof(T),
                t => t.GetProperties(BindingFlags.Public | BindingFlags.Instance));

            foreach (DataRow row in table.Rows)
            {
                T item = new();

                foreach (var property in properties)
                {
                    if (!table.Columns.Contains(property.Name))
                        continue;

                    var value = row[property.Name];

                    if (value == DBNull.Value)
                        continue;

                    var targetType =
                        Nullable.GetUnderlyingType(property.PropertyType)
                        ?? property.PropertyType;

                    property.SetValue(
                        item,
                        Convert.ChangeType(value, targetType));
                }

                result.Add(item);
            }

            return result;
        }

        public static T ToObject<T>(DataSet ds)
            where T : new()
        {
            return ToList<T>(ds).FirstOrDefault();
        }
    }
}
