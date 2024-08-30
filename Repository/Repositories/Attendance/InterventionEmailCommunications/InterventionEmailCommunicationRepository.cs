using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Attendance;

public class InterventionEmailCommunicationRepository: BaseAppRepository<InterventionEmailCommunicationItem>
{
    public InterventionEmailCommunicationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionEmailCommunicationRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<IEnumerable<InterventionEmailCommunicationModel>> GetScheduleMeetingReminderEmailsAsync()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnAndUpdateScheduleMeetingReminderEmails")
            .QueryMultipleAsync<InterventionEmailCommunicationModel, InterventionModel>()
            .Then(result => result.SingleJoin(e => e.InterventionId, i => i.Id, (e, i) => e.Intervention = i));
    }

    public Task<bool> UpdateAsync(IUserContext userContext, InterventionEmailCommunicationItem item)
    {
        return base.UpdateAsync(userContext, item);
    }
}
