using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Utility.DefaultData;

public sealed class DefaultDataRepository: BaseAppRepository<object>
{

    public DefaultDataRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<DefaultDataRepository> logger
        )
        : base(appConfigurations, logger)
    {
    }

    public Task<bool> GenerateDefaultDataAsync()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Utility.GenerateDefaultData")
            .ExecuteCommonAsync();
    }
}
