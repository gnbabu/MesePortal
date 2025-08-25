using Microsoft.Data.SqlClient;

namespace Maximus.Mese.Core.DBHelpers
{
    public static class SqlReaderExtensions
    {
        public static T? GetNullable<T>(this SqlDataReader reader, string columnName)
        {
            int ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? default : reader.GetFieldValue<T>(ordinal);
        }

        // Already defined ones
        public static string? GetNullableString(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<string>(columnName);

        public static int? GetNullableInt(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<int>(columnName);

        public static DateTime? GetNullableDateTime(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<DateTime>(columnName);

        // Additional common types
        public static bool? GetNullableBool(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<bool>(columnName);

        public static decimal? GetNullableDecimal(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<decimal>(columnName);

        public static double? GetNullableDouble(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<double>(columnName);

        public static float? GetNullableFloat(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<float>(columnName);

        public static long? GetNullableLong(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<long>(columnName);

        public static short? GetNullableShort(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<short>(columnName);

        public static byte? GetNullableByte(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<byte>(columnName);

        public static Guid? GetNullableGuid(this SqlDataReader reader, string columnName) =>
            reader.GetNullable<Guid>(columnName);

        public static byte[]? GetNullableBytes(this SqlDataReader reader, string columnName)
        {
            int ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? null : (byte[])reader.GetValue(ordinal);
        }
    }
}
