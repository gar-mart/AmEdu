using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Attendance.EngagementFlags;
using Repository.Repositories.Common.Student;

using Shared.Extensions.Tasks;
using Shared.Helpers;

namespace Repository.Repositories.Attendance;

public class InterventionRepository: BaseAppRepository<InterventionItem, InterventionModel>
{
    public InterventionRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<InterventionRepository> logger) : base(appConfigurations, logger)
    {
        ErrorMessageMap.Add(1, "Not Authorized.");
        ErrorMessageMap.Add(2, "Only warning interventions may be deleted when no other interventions have been generated.");
    }


    public Task<IEnumerable<InterventionModel>> GetBySearchAsync(int studentId, SchoolYear schoolYear)
    {
        var command = CommandBuilder
            .GetBySearchBuilder()
            .AddModel(new { studentId, schoolYear });

        return IncludeForeignEntitiesQuery(command);
    }

    public Task<IEnumerable<InterventionWithLevelsDto>> GetLevelsBySearchAsync(SchoolYear schoolYear, bool? enrollmentStatus = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnInterventionsWithLevelsBySearch")
            .AddModel(new { schoolYear, enrollmentStatus })
            .QueryListAsync<InterventionWithLevelsDto>();
    }


    public Task<InterventionModel> GetByIdAsync(int id)
    {
        var command = CommandBuilder
            .GetByIdBuilder()
            .AddModel(new { id });

        return IncludeForeignEntitiesQuery(command)
            .Then(result => result.FirstOrDefault());
    }

    public Task<IEnumerable<StudentItem>> GetStudentsWithInterventionsAsync(int? includeStudentId = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnStudentsWithInterventions")
            .AddModel(new { includeStudentId })
            .QueryListAsync<StudentItem>();
    }

    public async Task<bool> SetStatusAsync(IUserContext userContext, int id, InterventionStatus status)
    {
        return await CommandBuilder
            .GenericBuilder(userContext)
            .AddModel(new { id, status })
            .ForStoredProcedure("Attendance.SetInterventionStatus")
            .ExecuteCommonAsync();
    }

    public Task<bool> GenerateInterventionAsync(IUserContext userContext, int studentId, string reason)
    {
        var parameters = new
        {
            studentId,
            reason
        };

        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Attendance.GenerateIntervention")
            .AddModel(parameters)
            .ExecuteCommonAsync();
    }

    private static Task<IEnumerable<InterventionModel>> IncludeForeignEntitiesQuery(DapperCommandBuilder command)
    {
        return command
            .QueryMultipleAsync<InterventionModel, InterventionEmailCommunicationItem, InterventionScheduledMeetingItem, InterventionSuccessPlanItem, InterventionTruancyFormItem, EngagementFlagModel>()
            .Then(result => result.Item1
            .SingleJoin(result.Item2, i => i.Id, e => e.InterventionId, (i, e) => i.EmailCommunication = e)
            .SingleJoin(result.Item3, i => i.Id, s => s.InterventionId, (i, s) => i.ScheduledMeeting = s)
            .SingleJoin(result.Item4, i => i.Id, p => p.InterventionId, (i, p) => i.SuccessPlan = p)
            .SingleJoin(result.Item5, i => i.Id, t => t.InterventionId, (i, t) => i.TruancyForm = t)
            .SingleJoin(result.Item6, i => i.EngagementFlagId, e => e.Id, (i, e) => i.EngagementFlag = e)
            .Select(intervention =>
            {
                // specify default values for tasks
                intervention.EmailCommunication ??= new InterventionEmailCommunicationItem { InterventionId = intervention.Id };
                intervention.ScheduledMeeting ??= new InterventionScheduledMeetingItem { InterventionId = intervention.Id };
                intervention.SuccessPlan ??= new InterventionSuccessPlanItem { InterventionId = intervention.Id };
                intervention.TruancyForm ??= new InterventionTruancyFormItem { InterventionId = intervention.Id };

                return intervention;
            }));
    }

    public Task<bool> DeleteAsync(IUserContext userContext, int id)
    {
        return base.DeleteAsync(userContext, id);
    }
}
