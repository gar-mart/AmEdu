using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance;

public class InterventionSuccessPlanRepository: BaseAppRepository<InterventionSuccessPlanItem>
{
    public InterventionSuccessPlanRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionSuccessPlanRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<bool> UpdateAsync(IUserContext userContext, InterventionSuccessPlanItem item)
    {
        return base.UpdateAsync(userContext, item);
    }
}
