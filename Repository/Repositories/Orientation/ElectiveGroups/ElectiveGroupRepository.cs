using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Orientation.ElectiveGroupChoices;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Orientation.ElectiveGroups;

public class ElectiveGroupRepository: BaseAppRepository<ElectiveGroupItem, ElectiveGroupModel>
{
    public ElectiveGroupRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ElectiveGroupRepository> logger) : base(appConfigurations, logger) { }

    public Task<IEnumerable<ElectiveGroupModel>> GetListAsync()
    {
        return CommandBuilder
            .GetListBuilder()
            .QueryMultipleAsync<ElectiveGroupModel, ElectiveGroupChoiceModel, SemesterElectiveItem>()
            .Then(x => x.Item1
            .ManyJoin(x.Item2.ManyJoin(
                x.Item3,
                b => b.ElectiveId,
                c => c.ElectiveId,
                (b, c) => b.SemesterElectives.AddRange(c)),
            a => a.Id,
            b => b.ElectiveGroupId,
            (a, b) => a.ElectiveGroupChoices.AddRange(b)));
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }

    public Task<int> CreateAsync(ElectiveGroupItem item)
    {
        return base.CreateAsync(item);
    }

    public Task<bool> UpdateAsync(ElectiveGroupItem item)
    {
        return base.UpdateAsync(item);
    }
}
