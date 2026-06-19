using Microsoft.Data.SqlClient;
using ModelGenerator.Services;

var connectionString =
    @"Server=DESKTOP-BNTHM9S\SQLEXPRESS;
      Database=OH_PNM_MESE_MAIN;
      User Id=mese_user;
      Password=Gopavaram@123;
      TrustServerCertificate=True;";


var procedures = new Dictionary<string, string>
{
    { "ohpnm.usp_GetEmployees", "EmployeesModel" },
    { "ohpnm.usp_GetDepartments", "DepartmentsModel" },
    { "ohpnm.usp_GetUserDetailsById", "UserDetailsModel" },
    { "ohpnm.usp_GetUserRolesPermissions", "UserRolesPermissionsModel" },
    { "ohpnm.usp_ValidateUser", "ValidateUserModel" }
};
var outputFolder = Path.Combine(Directory.GetCurrentDirectory(), "GeneratedModels");

Directory.CreateDirectory(outputFolder);

var metadataReader =
    new SqlMetadataReader(connectionString);

var generator = new ModelGeneratorService();

foreach (var procedure in procedures)
{
    try
    {
        string procedureName = procedure.Key;
        string modelName = procedure.Value;

        Console.WriteLine($"Processing {procedureName}");

        var columns =
            await metadataReader.GetProcedureColumnsAsync(procedureName);

        if (!columns.Any())
        {
            Console.WriteLine($"No columns found for {procedureName}");
            continue;
        }

        var classCode =generator.GenerateClass(modelName, columns);

        var filePath =
            Path.Combine(outputFolder, $"{modelName}.cs");

        await File.WriteAllTextAsync(filePath, classCode);

        Console.WriteLine($"Generated {modelName}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed: {procedure.Key}");
        Console.WriteLine(ex.Message);
    }
}

Console.WriteLine("Completed");