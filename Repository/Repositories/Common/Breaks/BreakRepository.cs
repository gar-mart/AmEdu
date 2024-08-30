using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Common.Breaks;

public class BreakRepository: BaseAppRepository<BreakItem>
{
    public BreakRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<BreakRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<BreakItem>> GetListAsync(int year)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { year })
            .QueryListAsync<BreakItem>();
    }

    public Task<int> CreateAsync(BreakItem item)
    {
        return base.CreateAsync(item);
    }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }

    public Task<bool> UpdateAsync(BreakItem item)
    {
        return base.UpdateAsync(item);
    }
}
