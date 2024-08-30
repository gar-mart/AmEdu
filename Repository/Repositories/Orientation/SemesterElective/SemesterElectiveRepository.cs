using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class SemesterElectiveRepository: BaseAppRepository<SemesterElectiveItem>
{
    public SemesterElectiveRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<SemesterElectiveRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<SemesterElectiveItem>> ReturnUserElective(int userId, int semester, int schoolYear)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnUserElectives")
            .AddModel(new { userId, semester, schoolYear })
            .QueryListAsync<SemesterElectiveItem>();
    }
}
