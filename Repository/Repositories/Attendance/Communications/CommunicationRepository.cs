using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance.Communications;

public class CommunicationRepository: BaseAppRepository<CommunicationItem, CommunicationModel>
{
    public CommunicationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<CommunicationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<CommunicationModel>> GetListAsync(int userId, DateTime startDate, DateTime endDate)
    {
        return GetListAsync(new { userId, startDate, endDate });
    }

    public Task<int> CreateAsync(CommunicationItem item)
    {
        return base.CreateAsync(item);
    }

    public Task<bool> UpdateAsync(CommunicationItem item)
    {
        return base.UpdateAsync(item);
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }
}
