using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Student;

public class ReFuelLogRepository: BaseAppRepository<ReFuelLogItem>
{
    public ReFuelLogRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ReFuelLogRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<ReFuelLogItem>> GetListAsync(int studentId, DateTime date)
    {
        return GetListAsync(new { studentId, date });
    }

    public Task<bool> UpdateAsync(IUserContext userContext, int studentId, DateTime date, IEnumerable<ReFuelLogItem> logs)
    {
        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Student.UpdateReFuelLogs")
            .AddModel(new { studentId, date })
            .Add(nameof(logs), logs.Select(log => new { log.Id, In = log.CheckedIn, Out = log.CheckedOut }).CreateDataTable(), DbType.Object)
            .ExecuteCommonAsync();
    }
}
