using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace AutomatedTests;

/// <summary>
/// This repository should contain functions to handle database operations required to perform the integration tests.
/// This can include a teardown, an initialization, etc.
/// </summary>
public class TestingRepository: BaseRepository<object>
{
    public TestingRepository(IOptions<AppConfigurations> appConfigurations, ILogger<TestingRepository> logger) : base(appConfigurations, logger) { }

    public Task<bool> GenerateDefaultDataAsync()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Utility.GenerateDefaultData")
            .ExecuteCommonAsync();
    }
}
