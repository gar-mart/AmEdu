using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Orientation.OrientationReport;

namespace Repository.Repositories.Orientation;

public class OrientationReportRepository: BaseAppRepository<OrientationReportItem>
{
    public OrientationReportRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<OrientationReportRepository> logger
        ) : base(appConfigurations, logger) { }

    public async Task<OrientationReportItem> ReturnOrientationReport()
    {
        var result = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.ReturnOrientationReport")
            .QueryMultipleAsync<StudentOrientationResponseItem, StudentSemesterElectiveItem>();

        return new OrientationReportItem
        {
            StudentOrientationResponses = result.Item1.ToList(),
            StudentSemesterElectives = result.Item2.ToList()
        };
    }
}
