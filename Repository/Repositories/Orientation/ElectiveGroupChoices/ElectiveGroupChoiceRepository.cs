using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation.ElectiveGroupChoices;

public class ElectiveGroupChoiceRepository: BaseAppRepository<ElectiveGroupChoiceItem, ElectiveGroupChoiceModel>
{
    public ElectiveGroupChoiceRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ElectiveGroupChoiceRepository> logger) : base(appConfigurations, logger) { }

    public Task<bool> DeleteAsync(int id)
    {
        return base.DeleteAsync(id);
    }

    public Task<int> CreateAsync(ElectiveGroupChoiceItem item)
    {
        return base.CreateAsync(item);
    }
}
