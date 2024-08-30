using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions;
using Shared.Extensions.Tasks;

namespace Repository.Repositories.Staff;

public class CommunicationListRepository: BaseAppRepository<CommunicationListItem, CommunicationListModel>
{
    public CommunicationListRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<CommunicationListRepository> logger) : base(appConfigurations, logger)
    {
    }

    public Task<bool> SaveAsync(IUserContext userContext, CommunicationListModel model)
    {
        var entries = model.Entries.Where(entry => entry.UserId > 0) // filter out "additional recipients"
            .Select(entry => new
            {
                entry.UserId,
                entry.IncludeStudent,
                entry.IncludeGuardian1,
                entry.IncludeGuardian2,
                entry.IncludeMentor,
                entry.IncludeStaff
            }).CreateDataTable();

        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("SaveCommunicationList")
            .AddModel(model, m => m.Id, m => m.Name)
            .Add(nameof(entries), entries, DbType.Object)
            .ExecuteCommonAsync();
    }

    public Task<CommunicationListModel> GetByIdAsync(int id)
    {
        return CommandBuilder
            .GetByIdBuilder()
            .AddModel(new { id })
            .QueryMultipleAsync<CommunicationListModel, CommunicationListEntryModel>()
            .Then(result => result
            .ManyJoin(l => l.Id, e => e.CommunicationListId, (l, e) => l.Entries.AddRange(e))
            .FirstOrDefault());
    }

    public Task<IEnumerable<CommunicationListEntryModel>> GetPotentialEntriesAsync(CommunicationFilter filter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnPotentialCommunicationEntries")
            .AddModel(new
            {
                communicationListId = filter.List?.Id,
                mentorId = filter.Mentor?.Id,
                grades = filter.Grades == null ? null : string.Join(',', filter.Grades),
                filter.Domain
            })
            .QueryListAsync<CommunicationListEntryModel>();
    }

    public Task<IEnumerable<CommunicationListModel>> GetListAsync(IUserContext userContext)
    {
        return base.GetListAsync(userContext);
    }

    public Task<bool> DeleteAsync(IUserContext userContext, int id)
    {
        return base.DeleteAsync(userContext, id);
    }
}
