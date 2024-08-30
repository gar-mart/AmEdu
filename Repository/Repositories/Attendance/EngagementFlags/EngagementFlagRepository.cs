using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Attendance.Points;

using Shared.Helpers;

namespace Repository.Repositories.Attendance.EngagementFlags;

public class EngagementFlagRepository: BaseAppRepository<EngagementFlagItem, EngagementFlagModel>
{
    public EngagementFlagRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<EngagementFlagRepository> logger
        ) : base(appConfigurations, logger)
    {
        ErrorMessageMap[1] = "The intervention was already generated. Client and server out-of-sync. Please refresh your page.";
    }

    public Task<IEnumerable<EngagementFlagModel>> GenerateEngagementFlags(DateTime startOfWeek, DateTime endOfWeek)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.GenerateEngagementFlags")
            .AddModel(new { startOfWeek, endOfWeek })
            .QueryListAsync<EngagementFlagModel>();
    }

    public Task<IEnumerable<EngagementFlagModel>> ReturnEngagementFlagNotifications(IUserContext userContext)
    {
        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Attendance.ReturnEngagementFlagNotifications")
            .QueryListAsync<EngagementFlagModel>();
    }

    /// <summary>
    /// Returns engagementFlags for a given student. 
    /// An optional school year can be supplied to filter results.
    /// </summary>
    /// <param name="studentId">The student's user ID</param>
    /// <param name="schoolYear">The school year to return engagement flags for - start date based year.</param>
    /// <param name="acknowledgedByStudent">Optional filter to return engagement flags that have been or not been acknowledged by the student.</param>
    /// <returns></returns>
    public Task<IEnumerable<EngagementFlagModel>> ReturnByStudentId(int studentId, SchoolYear? schoolYear = null, bool? acknowledgedByStudent = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnEngagementFlagsByStudentId")
            .AddModel(new { studentId, schoolYear = schoolYear?.value, acknowledgedByStudent })
            .QueryListAsync<EngagementFlagModel>();
    }

    public Task<IEnumerable<EngagementFlagReportItem>> ReturnEngagementFlagReportItems(SchoolYear? schoolYear = null, bool? enrollmentStatus = null)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnEngagementFlagReport")
            .AddModel(new { schoolYear = schoolYear?.value, enrollmentStatus })
            .QueryListAsync<EngagementFlagReportItem>();
    }

    public Task<IEnumerable<EngagementFlagReportItem>> ReturnOutstandingEngagementFlagReportItems(DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnOutstandingEngagementFlagReport")
            .AddModel(new { startDate, endDate })
            .QueryListAsync<EngagementFlagReportItem>();
    }

    public Task<IEnumerable<EngagementFlagReportItem>> ReturnRejectedEngagementFlagReportItems(DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnRejectedEngagementFlagReport")
            .AddModel(new { startDate, endDate })
            .QueryListAsync<EngagementFlagReportItem>();
    }

    public Task<IEnumerable<FlaggedStudentReportItem>> ReturnFlaggedStudentsReport(DateTime startDate, DateTime endDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnFlaggedStudentsReport")
            .AddModel(new { startDate, endDate })
            .QueryListAsync<FlaggedStudentReportItem>();
    }
    public Task<IEnumerable<FlagResponsesReportItem>> ReturnFlagResponsesReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var procedure = chartGroupingFilter == "Grade Level" ? "Attendance.ReturnFlagResponsesReport"
       : chartGroupingFilter == "Cell" ? "Attendance.ReturnFlagResponsesReportByCell" : "Attendance.ReturnFlagResponsesReportByMentor";
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure(procedure)
            .AddModel(new { startDate, endDate, schoolFilter, mentorFilter })
            .QueryListAsync<FlagResponsesReportItem>();
    }

    public Task<IEnumerable<PointSourcePageReportItem>> ReturnPointSourcePageReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointSourcePageReport")
            .AddModel(new { startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter })
            .QueryListAsync<PointSourcePageReportItem>();
    }

    public Task<IEnumerable<PointSourceStaffReportItem>> ReturnPointSourceStaffReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointSourceStaffReport")
            .AddModel(new { startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter })
            .QueryListAsync<PointSourceStaffReportItem>();
    }

    public Task<IEnumerable<PointDetailReportItem>> ReturnPointDetailReport(DateTime startDate, DateTime endDate, string schoolFilter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointDetailReport")
            .AddModel(new { startDate, endDate, schoolFilter })
            .QueryListAsync<PointDetailReportItem>();
    }

    public Task<IEnumerable<PointTypeAwardReportItem>> ReturnPointTypesAwardedReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnPointTypesAwardedReport")
            .AddModel(new { startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter })
            .QueryListAsync<PointTypeAwardReportItem>();
    }
    public Task<IEnumerable<FlagsGeneratedReportItem>> ReturnFlagsGeneratedReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnFlagsGeneratedReport")
            .AddModel(new { startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter })
            .QueryListAsync<FlagsGeneratedReportItem>();
    }

    public Task<bool> UpdateAsync(IUserContext userContext, EngagementFlagItem item)
    {
        return base.UpdateAsync(userContext, item);
    }

    public Task<bool> AcknowledgeEngagementFlagAsync(int id, bool acknowledgedByStudent)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("AcknowledgeEngagementFlag")
            .AddModel(new { id, acknowledgedByStudent })
            .ExecuteCommonAsync();
    }
}
