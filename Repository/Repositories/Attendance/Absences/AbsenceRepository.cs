using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Attendance.Absences;

namespace Repository.Repositories.Attendance.Tardiness;

public class AbsenceRepository: BaseAppRepository<AbsenceItem, AbsenceModel>
{
    public AbsenceRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<AbsenceRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<int> CreateAsync(AbsenceItem item, int createdByUserId, DateTime currentDateTime)
    {
        return CommandBuilder
            .InsertBuilder()
            .AddModel(item)
            .AddModel(new { createdByUserId, currentDateTime })
            .ExecuteCreateAsync();
    }


    public Task<bool> UpdateAsync(AbsenceItem item, int createdByUserId, DateTime currentDateTime)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(item)
            .AddModel(new { createdByUserId, currentDateTime })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<AbsenceModel>> GetListAsync(int userId, DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { userId, startDate, endDate })
            .ForStoredProcedure("ReturnAbsences")
            .QueryListAsync<AbsenceModel>();
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }
}
