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

var metadataReader = new SqlMetadataReader(connectionString);

var generator = new ModelGeneratorService();

foreach (var procedure in procedures)
{
    try
    {
        string procedureName = procedure.Key;
        string modelName = procedure.Value;

        Console.WriteLine(
            $"Processing {procedureName}");

        var resultSets =
            await metadataReader.GetProcedureResultSetsAsync(procedureName);

        if (!resultSets.Any())
        {
            Console.WriteLine(
                $"No result sets found for {procedureName}");

            continue;
        }

        var files =
            generator.GenerateModels(
                modelName,
                resultSets);

        foreach (var file in files)
        {
            var filePath = Path.Combine(outputFolder, file.Key);

            await File.WriteAllTextAsync(filePath, file.Value);

            Console.WriteLine($"Generated {file.Key}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(
            $"Failed: {procedure.Key}");

        Console.WriteLine(ex.ToString());
    }
}

Console.WriteLine("Completed");