using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class UserElectiveStepRepository: BaseAppRepository<UserElectiveStepItem>
{
    public UserElectiveStepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<UserElectiveStepRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> Step_UserElectives_Submit(int userId, List<UserElectiveStepItem> electiveList)
    {
        var electveList = electiveList.Select(e => new { e.Semester, e.ElectiveId, e.GradeLevel }).CreateDataTable();
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.Step_UserElectives_Submit")
            .AddModel(new { userId, electveList })
            .ExecuteCommonAsync();
    }
}
