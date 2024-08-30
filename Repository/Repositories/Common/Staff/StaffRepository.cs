using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Dapper;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Common.User;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Common.Staff;

public class StaffRepository: BaseAppRepository<StaffItem>
{
    public StaffRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StaffRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<StaffItem>> ReturnAllStaff()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnAllStaff")
            .QueryMultipleAsync<StaffItem, MentorItem, CounselorItem>()
            .Then(result => result.Item1
            .ManyJoin(result.Item2, s => s.Id, g => g.UserId, (s, g) => s.MentorGrades.AddRange(g.Select(l => l.GradeLevel)))
            .ManyJoin(result.Item3, s => s.Id, g => g.UserId, (s, g) => s.CounselorGrades.AddRange(g.Select(l => l.GradeLevel))));
    }

    public Task<List<StaffItem>> ReturnMentors(bool? hasMentees = true)
    {
        return CommandBuilder
            .CoreBuilder()
            .AddModel(new { hasMentees })
            .ForStoredProcedure("Common.ReturnMentors")
            .QueryListAsync<StaffItem>()
            .Then(result => result.AsList());
    }

    public Task<IEnumerable<StaffItem>> ReturnCounselors(string gradeLevel = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .AddModel(new { gradeLevel })
            .ForStoredProcedure("Common.ReturnCounselors")
            .QueryListAsync<StaffItem>();
    }

    public async Task<IEnumerable<UserItem>> ReturnStaffBySearch(string searchTerm)
    {
        return await CommandBuilder
            .GetBySearchBuilder()
            .Add(nameof(searchTerm), searchTerm)
            .ForStoredProcedure("Common.ReturnStaffBySearch")
            .QueryListAsync<UserItem>();
    }

    public Task<bool> UpdateStaffMemberAsync(StaffItem staffMember)
    {
        return CommandBuilder
            .UpdateBuilder()
            .ForStoredProcedure("Common.UpdateStaffMember")
            .AddModel(new
            {
                staffMember.Id,
                staffMember.AppointmentLink,
                staffMember.IntroVideoId
            })
            .Add(nameof(staffMember.MentorGrades), staffMember.MentorGrades.Select(grade => new { grade }).CreateDataTable(), System.Data.DbType.Object)
            .Add(nameof(staffMember.CounselorGrades), staffMember.CounselorGrades.Select(grade => new { grade }).CreateDataTable(), System.Data.DbType.Object)
            .ExecuteCommonAsync();
    }
}
