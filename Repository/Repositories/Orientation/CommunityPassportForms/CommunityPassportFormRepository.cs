using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class CommunityPassportFormRepository: BaseAppRepository<CommunityPassportFormItem>
{
    public CommunityPassportFormRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<CommunityPassportFormRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<IEnumerable<CommunityPassportFormItem>> GetListAsync()
    {
        return base.GetListAsync();
    }

    public Task<CommunityPassportFormItem> GetByGradeLevelAsync(string gradeLevel)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnCommunityPassportFormByGradeLevel")
            .AddModel(new { gradeLevel })
            .QuerySingleAsync<CommunityPassportFormItem>();
    }

    public Task<bool> UpdateAsync(IEnumerable<CommunityPassportFormItem> items)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("UpdateCommunityPassportForms")
            .Add(nameof(items),
                items.Select(i => new
                {
                    Cell = (int)i.Cell,
                    i.Url,
                }).CreateDataTable(),
                DbType.Object)
            .ExecuteCommonAsync();
    }
}
