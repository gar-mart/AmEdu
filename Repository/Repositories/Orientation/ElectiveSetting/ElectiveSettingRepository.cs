using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation.ElectiveSetting;

public class ElectiveSettingRepository: BaseAppRepository<ElectiveSettingItem>
{
    public ElectiveSettingRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ElectiveSettingRepository> logger) : base(appConfigurations, logger) { }

    public async Task<bool> UpdateElectiveSettings(IEnumerable<ElectiveSettingItem> electiveSettingList)
    {
        var electiveSettings = electiveSettingList.Select(x => new { x.GradeLevel, x.RequiredElectivesPerSemester1, x.RequiredElectivesPerSemester2 });

        return await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Orientation.UpdateElectiveSettings")
            .Add(nameof(electiveSettings), electiveSettings.CreateDataTable(), dbType: DbType.Object)
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<ElectiveSettingItem>> GetListAsync()
    {
        return base.GetListAsync();
    }
}
