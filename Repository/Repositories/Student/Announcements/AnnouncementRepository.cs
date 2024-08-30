using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Student.Announcements;

public class AnnouncementRepository: BaseAppRepository<AnnouncementModel>
{
    public AnnouncementRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<AnnouncementRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<AnnouncementModel>> GetListAsync(int currentUserId, DateTime currentDateTime)
    {
        return base.GetListAsync(new { currentUserId, currentDateTime });
    }

    public Task<bool> MarkAnnouncementRead(IUserContext userContext, int id)
    {
        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Student.MarkAnnouncementRead")
            .AddModel(new { id })
            .ExecuteCommonAsync();
    }

    public Task<AnnouncementModel> GetByIdAsync(int id)
    {
        return base.GetByIdAsync(id);
    }
}
