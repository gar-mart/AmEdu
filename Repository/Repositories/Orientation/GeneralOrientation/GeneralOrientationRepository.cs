using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class GeneralOrientationRepository: BaseAppRepository<GeneralOrientationItem>
{
    public GeneralOrientationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<GeneralOrientationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> StartOrientationAsync(int userId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.StartOrientation")
            .AddModel(new { userId })
            .ExecuteCommonAsync();
    }

    public Task<bool> ResetStudentOrientation(int? userId = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ResetStudentOrientation")
            .AddModel(new { userId })
            .ExecuteCommonAsync();
    }
}
