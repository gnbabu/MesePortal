using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public async Task<List<ProcedureColumn>>
            GetProcedureColumnsAsync(
                string procedureName)
        {
            var columns =
                new List<ProcedureColumn>();

            var sql = $@"
                        SELECT
                            name,
                            system_type_id,
                            is_nullable
                        FROM sys.dm_exec_describe_first_result_set
                        (
                            'EXEC {procedureName}',
                            NULL,
                            0
                        )
                        WHERE name IS NOT NULL";

            await using var conn =
                new SqlConnection(_connectionString);

            await conn.OpenAsync();

            await using var cmd =
                new SqlCommand(sql, conn);

            await using var reader =
                await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                columns.Add(new ProcedureColumn
                {
                    ColumnName =
                        reader["name"].ToString(),

                    SqlTypeId =
                        Convert.ToInt32(
                            reader["system_type_id"]),

                    IsNullable =
                        Convert.ToBoolean(
                            reader["is_nullable"])
                });
            }

            return columns;
        }
    }
}
