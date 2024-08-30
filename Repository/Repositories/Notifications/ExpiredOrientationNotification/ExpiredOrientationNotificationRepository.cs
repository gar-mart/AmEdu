using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Common.Staff;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Notifications.ExpiredOrientationNotification;

public class ExpiredOrientationNotificationRepository: BaseAppRepository<ExpiredOrientationNotificationItem>
{
    public ExpiredOrientationNotificationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ExpiredOrientationNotificationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> HandleExpirationNotificationSent(int userId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Notification.HandleExpirationNotificationSent")
            .AddModel(new { userId })
            .ExecuteCommonAsync();
    }

    public async Task<ExpiredOrientationNotificationItem> ReturnExpiredOrientation()
    {
        var result = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Notification.ReturnExpiredOrientation")
            .QueryMultipleAsync<StudentItem, StaffItem>();

        return new ExpiredOrientationNotificationItem
        {
            StudentList = result.Item1.ToList(),
            MentorList = result.Item2.ToList()
        };
    }
}
