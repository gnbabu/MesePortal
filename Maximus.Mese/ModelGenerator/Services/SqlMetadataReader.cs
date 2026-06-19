using System.Data;
using Microsoft.Data.SqlClient;
using ModelGenerator.Models;

namespace ModelGenerator.Services
{
    public class SqlMetadataReader
    {
        private readonly string _connectionString;

        public SqlMetadataReader(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<ResultSetInfo>> GetProcedureResultSetsAsync(string procedureName)
        {
            var resultSets = new List<ResultSetInfo>();

            await using var conn = new SqlConnection(_connectionString);
            await conn.OpenAsync();

            await using var cmd = new SqlCommand(procedureName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            var parameters = await GetProcedureParametersAsync(conn, procedureName);

            foreach (var parameter in parameters)
            {
                cmd.Parameters.AddWithValue(parameter.Name, GetSampleValue(parameter.SqlType));
            }

            await using var reader = await cmd.ExecuteReaderAsync(CommandBehavior.SchemaOnly);

            int resultSetNumber = 1;

            do
            {
                var schema = reader.GetColumnSchema();

                if (schema.Count > 0)
                {
                    var resultSet = new ResultSetInfo
                    {
                        ResultSetNumber = resultSetNumber
                    };

                    foreach (var column in schema)
                    {
                        resultSet.Columns.Add(
                            new ProcedureColumn
                            {
                                ColumnName = column.ColumnName,
                                DataType = column.DataType,
                                IsNullable = column.AllowDBNull ?? true
                            });
                    }

                    resultSets.Add(resultSet);
                }

                resultSetNumber++;

            }
            while (await reader.NextResultAsync());

            return resultSets;
        }

        private async Task<List<ParameterInfo>> GetProcedureParametersAsync(SqlConnection conn, string procedureName)
        {
            var parameters = new List<ParameterInfo>();

            string sql = @"
                        SELECT
                            p.name,
                            t.name AS SqlType
                        FROM sys.parameters p
                        INNER JOIN sys.types t
                            ON p.user_type_id = t.user_type_id
                        WHERE p.object_id = OBJECT_ID(@ProcedureName)
                        ORDER BY p.parameter_id";

            await using var cmd = new SqlCommand(sql, conn);

            cmd.Parameters.AddWithValue("@ProcedureName", procedureName);

            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                parameters.Add(
                    new ParameterInfo
                    {
                        Name = reader["name"].ToString(),
                        SqlType = reader["SqlType"].ToString()
                    });
            }

            return parameters;
        }


        private static object GetSampleValue(string sqlType)
        {
            return sqlType.ToLower() switch
            {
                "int" => 1,
                "bigint" => 1L,
                "smallint" => (short)1,
                "tinyint" => (byte)1,

                "bit" => false,

                "varchar" => "Test",
                "nvarchar" => "Test",
                "char" => "Test",
                "nchar" => "Test",

                "decimal" => 1m,
                "numeric" => 1m,
                "money" => 1m,

                "float" => 1.0,
                "real" => 1.0f,

                "datetime" => DateTime.Now,
                "datetime2" => DateTime.Now,
                "date" => DateTime.Today,

                "uniqueidentifier" => Guid.NewGuid(),

                _ => DBNull.Value
            };
        }
    }
}