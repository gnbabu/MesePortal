using Microsoft.Data.SqlClient;
using ModelGenerator.Services;

var connectionString =
    @"Server=DESKTOP-BNTHM9S\SQLEXPRESS;
      Database=OH_PNM_MESE_MAIN;
      User Id=mese_user;
      Password=Gopavaram@123;
      TrustServerCertificate=True;";


var procedureNames = new List<string>
{
    "ohpnm.usp_GetEmployees",
    "ohpnm.usp_GetDepartments",
    "ohpnm.usp_GetUserDetailsById",
    "ohpnm.usp_GetUserRolesPermissions",
    "ohpnm.usp_ValidateUser"
};

var outputFolder = Path.Combine(
    Directory.GetCurrentDirectory(),
    "GeneratedModels");

Directory.CreateDirectory(outputFolder);

var metadataReader =
    new SqlMetadataReader(connectionString);

var generator =
    new ModelGeneratorService();

foreach (var procedureName in procedureNames)
{
    try
    {
        Console.WriteLine($"Processing {procedureName}");

        var columns =
            await metadataReader.GetProcedureColumnsAsync(
                procedureName);

        if (!columns.Any())
        {
            Console.WriteLine(
                $"No columns found for {procedureName}");

            continue;
        }

        var classCode =
            generator.GenerateClass(
                procedureName,
                columns);

        var className =
            generator.BuildClassName(
                procedureName);

        var filePath =
            Path.Combine(
                outputFolder,
                $"{className}.cs");

        await File.WriteAllTextAsync(
            filePath,
            classCode);

        Console.WriteLine(
            $"Generated {className}");
    }
    catch (Exception ex)
    {
        Console.WriteLine(
            $"Failed: {procedureName}");

        Console.WriteLine(ex.Message);
    }
}

Console.WriteLine("Completed");