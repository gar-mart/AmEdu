using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Attendance;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Staff;

public class EmailTemplateRepository: BaseAppRepository<EmailTemplateItem>
{
    public EmailTemplateRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<EmailTemplateRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<EmailTemplateItem> GetByIdAsync(IUserContext userContext, InterventionLevel interventionLevel)
    {
        return GetListAsync(userContext, new { interventionLevel })
            .Then(result => result
            .FirstOrDefault());
    }

    public Task<IEnumerable<EmailTemplateItem>> GetListAsync(IUserContext userContext)
    {
        return base.GetListAsync(userContext);
    }

    public Task<int> CreateAsync(IUserContext userContext, EmailTemplateItem item)
    {
        return base.CreateAsync(userContext, item);
    }

    public Task<bool> DeleteAsync(IUserContext userContext, int id)
    {
        return base.DeleteAsync(userContext, id);
    }
}
