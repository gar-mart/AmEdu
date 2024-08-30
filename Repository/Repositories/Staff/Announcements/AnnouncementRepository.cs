using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Buzz;
using Shared.Buzz.Responses;

namespace Repository.Repositories.Staff.Announcements;

public class AnnouncementRepository: BaseAppRepository<AnnouncementItem>
{
    public AnnouncementRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<AnnouncementRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> ReplaceAsync(int buzzClassId, IEnumerable<GetAnnouncementResponse.GetAnnouncementResponseAnnouncement> buzzAnnouncements, ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Staff.ReplaceAnnouncements")
            .AddModel(new
            {
                connexusClassId = apiType == ApiType.Connexus ? buzzClassId : (int?)null,
                lincolnLearningId = apiType == ApiType.LincolnLearning ? buzzClassId : (int?)null,
                flexPointId = apiType == ApiType.FlexPoint ? buzzClassId : (int?)null,
                announcements = buzzAnnouncements.Select(a => new
                {
                    a.Title,
                    a.Body.Value,
                    a.StartDate,
                    a.EndDate,
                    a.Path
                }).CreateDataTable()
            })
            .ExecuteCommonAsync();
    }
}
