using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Maximus.Mese.Core.DBHelpers
{
   public class SqlDataAccessHelper
    {
        private readonly string _connectionString;

        public SqlDataAccessHelper(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("Database connection string 'DefaultConnection' is not configured.");
            }

            _connectionString = connectionString;
        }

        // ============================
        // ExecuteScalar (return single value)
        // ============================
        public async Task<T> ExecuteScalarAsync<T>(string storedProcedure, SqlParameter[] parameters = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                var result = await command.ExecuteScalarAsync();

                if (result == null || result == DBNull.Value)
                    return default;

                return (T)Convert.ChangeType(result, typeof(T));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteScalar for {storedProcedure}", ex);
            }
        }

        // ============================
        // ExecuteNonQuery (insert/update/delete)
        // ============================
        public async Task<int> ExecuteNonQueryAsync(string storedProcedure, SqlParameter[] parameters = null)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                return await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteNonQuery for {storedProcedure}", ex);
            }
        }

        // ============================
        // ExecuteReader (map results to objects)
        // ============================
        public async Task<IEnumerable<T>> ExecuteReaderAsync<T>(string storedProcedure, SqlParameter[] parameters, Func<SqlDataReader, T> map)
        {
            var results = new List<T>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    results.Add(map(reader));
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteReader for {storedProcedure}", ex);
            }

            return results;
        }

        // ============================
        // ExecuteDataTable (return DataTable)
        // ============================
        public async Task<DataTable> ExecuteDataTableAsync(string storedProcedure, SqlParameter[] parameters = null)
        {
            var dataTable = new DataTable();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                using var adapter = new SqlDataAdapter(command);
                adapter.Fill(dataTable);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteDataTable for {storedProcedure}", ex);
            }

            return dataTable;
        }

        // ============================
        // ExecuteDataSet (multiple tables)
        // ============================
        public async Task<DataSet> ExecuteDataSetAsync(string storedProcedure, SqlParameter[] parameters = null)
        {
            var dataSet = new DataSet();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                using var adapter = new SqlDataAdapter(command);
                adapter.Fill(dataSet);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteDataSet for {storedProcedure}", ex);
            }

            return dataSet;
        }

        // ============================
        // ExecuteReader (single row)
        // ============================
        public async Task<T> ExecuteSingleAsync<T>(string storedProcedure, SqlParameter[] parameters, Func<SqlDataReader, T> map)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand(storedProcedure, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (parameters != null)
                    command.Parameters.AddRange(parameters);

                using var reader = await command.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    return map(reader);
                }

                return default;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error executing ExecuteSingle for {storedProcedure}", ex);
            }
        }
    }

}
