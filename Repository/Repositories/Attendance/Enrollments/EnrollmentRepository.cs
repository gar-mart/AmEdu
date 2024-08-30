using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions;

namespace Repository.Repositories.Attendance.Enrollments;

public class EnrollmentRepository: BaseAppRepository<EnrollmentItem>
{
    public EnrollmentRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<EnrollmentRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<EnrollmentItem>> MatchStudentEnrollmentsAsync(IEnumerable<EnrollmentItem> enrollments)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.MatchAndReturnEnrollments")
            .Add(nameof(enrollments), EnrollmentItem.ToTVP(enrollments), DbType.Object)
            .QueryListAsync<EnrollmentItem>();
    }

    public async Task<IEnumerable<EnrollmentModel>> ReturnEnrollmentReport(DateTime startDate, DateTime endDate, string gradeLevel, string emailDomain, IEnumerable<int> studentIds)
    {
        var builder = CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Staff.ReturnEnrollmentReport")
            .AddModel(new
            {
                startDate,
                endDate,
                gradeLevel,
                emailDomain
            });

        if (studentIds?.Any() == true)
        {
            builder = builder.Add(nameof(studentIds), studentIds.Select(x => new { Id = x }).CreateDataTable(), DbType.Object);
        }

        var result = await builder.QueryMultipleAsync<EnrollmentModel, EnrollmentData>();

        return result.ManyJoin(
            enrollment => enrollment.Id,
            data => data.Id,
            (enrollment, data) => enrollment.Data = data);
    }

    public Task<bool> UpdateAsync(EnrollmentItem item)
    {
        return base.UpdateAsync(item);
    }
}
