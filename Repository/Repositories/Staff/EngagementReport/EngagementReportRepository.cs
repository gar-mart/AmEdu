using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Extensions;
using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using static Repository.Repositories.Staff.EngagementReport.EngagementMetricItem;

namespace Repository.Repositories.Staff.EngagementReport;

public class EngagementReportRepository: BaseAppRepository<EngagementReportItem>
{
    public EngagementReportRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<EngagementReportRepository> logger
        ) : base(appConfigurations, logger)
    {
        ErrorMessageMap.Add(1, "Raw data for the provided metric has not been implemented.");
    }

    public Task<(IEnumerable<EngagementReportItem> Items, int Total)> GetListAsync(IUserContext userContext, DateTime startDate, DateTime endDate, int page, int perPage, string studentName, string gradeLevel, bool? enrollmentStatus, bool myStudents, string school, string sortBy, string sortDirection)
    {
        return GetListAsync(startDate, endDate, userContext, null, page, perPage, studentName, gradeLevel, enrollmentStatus, myStudents, school, sortBy, sortDirection);
    }

    public async Task<IEnumerable<EngagementReportItem>> GetListAsync(IUserContext userContext, DateTime startDate, DateTime endDate, int studentId)
    {
        return (await GetListAsync(startDate, endDate, userContext, studentId)).Items;
    }

    public Task<EngagementMetricItem> GetMetricDataAsync(int studentId, string metric, DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnEngagementMetricData")
            .AddModel(new
            {
                studentId,
                metric,
                startDate,
                endDate
            })
            .QueryMultipleAsync<EngagementMetricColumn, EngagementMetricData>()
            .Then(result => new EngagementMetricItem
            {
                Columns = result.Item1,
                Data = result.Item2
            });
    }

    public Task<AssignmentsCompletedModel> GetAssignmentsCompletedAsync(int studentId, DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("ReturnAssignmentsCompleted")
            .AddModel(new
            {
                studentId,
                startDate,
                endDate
            })
            .QuerySingleAsync<AssignmentsCompletedModel>();
    }

    private async Task<(IEnumerable<EngagementReportItem> Items, int Total)> GetListAsync(DateTime startDate, DateTime endDate, IUserContext userContext, int? studentId = null, int page = 1, int perPage = 100, string studentName = null, string gradeLevel = null, bool? enrollmentStatus = null, bool myStudents = false, string school = null, string sortBy = null, string sortDirection = null)
    {
        const string total = nameof(total);

        var (items, result) = await CommandBuilder
            .GetListBuilder(userContext)
            .AddOutput(total, System.Data.DbType.Int32)
            .AddModel(new
            {
                startDate,
                endDate,
                studentId,
                page,
                perPage,
                studentName,
                gradeLevel,
                enrollmentStatus,
                myStudents,
                school,
                sortBy,
                sortDirection
            })
            .CoreQueryAsync<EngagementReportItem>();

        return (items, result.Get<int>(total));
    }
}
