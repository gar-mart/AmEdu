using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance;

public class InterventionScheduledMeetingRepository: BaseAppRepository<InterventionScheduledMeetingItem>
{
    public InterventionScheduledMeetingRepository(IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionScheduledMeetingRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<bool> UpdateAsync(IUserContext userContext, InterventionScheduledMeetingItem item)
    {
        return base.UpdateAsync(userContext, item);
    }
}
