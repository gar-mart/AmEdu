using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Student.ScoreHistory;

public class ScoreHistoryRepository: BaseAppRepository<ScoreHistoryItem>
{
    public ScoreHistoryRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ScoreHistoryRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> UpdateAsync()
    {
        return base.UpdateAsync(new ScoreHistoryItem());
    }
}
