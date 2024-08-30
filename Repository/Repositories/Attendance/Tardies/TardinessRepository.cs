using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance.Tardiness;

public class TardinessRepository: BaseAppRepository<TardinessItem, TardinessModel>
{
    public TardinessRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<TardinessRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> UpdateAsync(TardinessItem item, DateTime currentDateTime)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(item)
            .AddModel(new { currentDateTime })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<TardinessModel>> GetListAsync(int userId, DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { userId, startDate, endDate })
            .QueryListAsync<TardinessModel>();
    }
}
