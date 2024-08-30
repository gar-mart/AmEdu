using System;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Attendance.LiveLessonPoints;

public class LiveLessonPointsRepository: BaseAppRepository<LiveLessonPointsItem, LiveLessonPointsModel>
{
    public LiveLessonPointsRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<LiveLessonPointsRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> UpdateAsync(LiveLessonPointsModel item, DateTime currentDateTime)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(item)
            .AddModel(new { currentDateTime })
            .ExecuteCommonAsync();
    }
}
