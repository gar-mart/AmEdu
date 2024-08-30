using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance;

public class InterventionTruancyFormRepository: BaseAppRepository<InterventionTruancyFormItem>
{
    public InterventionTruancyFormRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionTruancyFormRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<bool> UpdateAsync(IUserContext userContext, InterventionTruancyFormItem item)
    {
        return base.UpdateAsync(userContext, item);
    }
}
