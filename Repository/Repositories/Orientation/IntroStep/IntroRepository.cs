using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Orientation;

public class IntroStepRepository: BaseAppRepository<IntroStepItem>
{
    public IntroStepRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<IntroStepRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IntroStepItem> GetByIdAsync(int userId)
    {
        return base.GetByIdAsync(userId);
    }
}
