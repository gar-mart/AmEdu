using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Buzz;

using static Shared.Buzz.Responses.GetEnrollmentActivityResponse.GetEnrollmentActivityEnrollment;

namespace Repository.Repositories.Attendance.OnlineHours;

public class OnlineHoursRepository: BaseAppRepository<OnlineHoursItem>
{
    public OnlineHoursRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<OnlineHoursRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> UpdateAsync(GetEnrollmentActivityEnrollmentActivity enrollmentActivity, ApiType apiType)
    {
        return CommandBuilder
            .UpdateBuilder()
            .AddModel(new
            {
                connexusId = apiType == ApiType.Connexus ? int.Parse(enrollmentActivity.EnrollmentId) : (int?)null,
                lincolnLearningId = apiType == ApiType.LincolnLearning ? int.Parse(enrollmentActivity.EnrollmentId) : (int?)null,
                flexPointId = apiType == ApiType.FlexPoint ? int.Parse(enrollmentActivity.EnrollmentId) : (int?)null,
                date = enrollmentActivity.Date,
                seconds = enrollmentActivity.Seconds
            })
            .ExecuteCommonAsync();
    }
}
