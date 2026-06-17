using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Data.SqlClient;


namespace Maximus.Mese.APIFramework.Helper
{


    public static class SqlDbHelper
    {
        private static string _connectionString;

        public static void Initialize(string connectionString)
        {
            _connectionString = connectionString;
        }

        public static DataSet GetData(string entityName)
        {
            string spName = GetStoredProcedure(entityName);

            using SqlConnection con = new SqlConnection(_connectionString);
            using SqlCommand cmd = new SqlCommand(spName, con);

            cmd.CommandType = CommandType.StoredProcedure;

            DataSet ds = new DataSet();

            using SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);

            return ds;
        }

        public static DataSet GetData(
            string entityName,
            Dictionary<string, object> parameters)
        {
            string spName = GetStoredProcedure(entityName);

            using SqlConnection con = new SqlConnection(_connectionString);
            using SqlCommand cmd = new SqlCommand(spName, con);

            cmd.CommandType = CommandType.StoredProcedure;

            foreach (var parameter in parameters)
            {
                cmd.Parameters.AddWithValue(
                    parameter.Key,
                    parameter.Value ?? DBNull.Value);
            }

            DataSet ds = new DataSet();

            using SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(ds);

            return ds;
        }

        private static string GetStoredProcedure(string entityName)
        {
            return entityName.ToLower() switch
            {
                "employee" => "[ohpnm].[usp_GetEmployees]",
                "department" => "[ohpnm].[usp_GetDepartments]",
                _ => throw new Exception(
                        $"No SP mapping found for {entityName}")
            };
        }
    }
}
