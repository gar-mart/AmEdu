using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance.InterventionThresholds;

public class InterventionThresholdRepository: BaseAppRepository<InterventionThresholdItem>
{
    public InterventionThresholdRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionThresholdRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<InterventionThresholdItem> GetByGrade(string grade)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnInterventionThresholdByGrade")
            .AddModel(new { grade })
            .QuerySingleAsync<InterventionThresholdItem>();
    }

    public Task<IEnumerable<InterventionThresholdItem>> GetListAsync()
    {
        return base.GetListAsync();
    }

    public Task<bool> UpdateAsync(InterventionThresholdItem item)
    {
        return base.UpdateAsync(item);
    }
}
