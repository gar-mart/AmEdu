using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Buzz;
using Shared.Buzz.Schemas;
using Shared.Helpers;

namespace Repository.Repositories.Attendance.ClassUsers;

public class ClassUserRepository: BaseAppRepository<ClassUserItem, ClassUserModel>
{
    public ClassUserRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ClassUserRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<bool> CreateAsync(Enrollment enrollment, ApiType apiType)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.CreateClassUser")
            .AddModel(new
            {
                connexusId = apiType == ApiType.Connexus ? int.Parse(enrollment.CourseId) : (int?)null,
                lincolnLearningId = apiType == ApiType.LincolnLearning ? int.Parse(enrollment.CourseId) : (int?)null,
                flexPointId = apiType == ApiType.FlexPoint ? int.Parse(enrollment.CourseId) : (int?)null,
                userEmailAddress = enrollment.User.Email,
                enrollmentId = int.Parse(enrollment.Id),
                scoreAchieved = enrollment.EnrollmentMetrics?.Achieved ?? 0,
                scorePossible = enrollment.EnrollmentMetrics?.Possible ?? 0,
                totalSecondsSpentOnline = enrollment.EnrollmentMetrics?.Seconds ?? 0,
                enrollment.StartDate,
                enrollment.EndDate,
                enrollment.Status
            })
            .ExecuteCommonAsync();
    }

    public Task<IEnumerable<ClassUserModel>> GetListAsync(int classId, DateTime date)
    {
        return GetListAsync(new { classId, date });
    }

    public Task<IEnumerable<ClassUserModel>> GetCurrentClassUsers()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnCurrentClassUsers")
            .QueryListAsync<ClassUserModel>();
    }

    public async Task<(IEnumerable<ClassUserModel> ClassUsers, DateTime StartDate, DateTime EndDate)> GetByStudentId(int studentId, DateTime? startDate = null, DateTime? endDate = null)
    {
        var (Items, DynamicParameters) = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Attendance.ReturnClassUsersByStudentId")
            .AddModel(new { studentId })
            .Add(nameof(startDate), startDate, System.Data.DbType.Date, direction: System.Data.ParameterDirection.InputOutput)
            .Add(nameof(endDate), endDate, System.Data.DbType.Date, direction: System.Data.ParameterDirection.InputOutput)
            .CoreQueryAsync<ClassUserModel>();

        return (Items, DynamicParameters.Get<DateTime>(nameof(startDate)), DynamicParameters.Get<DateTime>(nameof(endDate)));
    }

    public async Task<string> BuildSnapshotTable(IEnumerable<ClassUserModel> snapshotClassUserRecords, int studentId, string studentName = null, DateTime? weekOfDate = null)
    {
        if (!snapshotClassUserRecords.Any())
        {
            return EmailBuilder.BuildParagraph($"There are no active enrollments{(string.IsNullOrEmpty(studentName) ? "" : "for " + studentName)}.", applyBold: true);
        }

        var (currentClassUserRecords, _, _) = await GetByStudentId(studentId);

        var weekOfDateHeader = weekOfDate.HasValue ? $"Week Of" : "Last Week";

        var headers = new List<TableCellItem>
        {
            new TableCellItem("Class"),
            new TableCellItem($"Live Lessons<br>({weekOfDateHeader})"),
            new TableCellItem($"Time Spent<br>({weekOfDateHeader})"),
            new TableCellItem("Time Spent<br>(All Time)"),
            new TableCellItem($"Score<br>({weekOfDateHeader})", width: 125),
            new TableCellItem("Score<br>(Current)", width: 125)
        };

        var tableRowData = snapshotClassUserRecords.Select(classUserRecord =>
        {
            var currentClassUserRecord = currentClassUserRecords.FirstOrDefault(c => c.ClassId == classUserRecord.ClassId);
            return new List<TableCellItem>
            {
                new TableCellItem(classUserRecord.ClassName),
                new TableCellItem($"{classUserRecord.LiveLessonPoints}"),
                new TableCellItem(FormatSeconds((int)Math.Round(classUserRecord.OnlineHoursSpentThisWeek * 3600))),
                new TableCellItem(FormatSeconds(classUserRecord.TotalSecondsSpentOnline)),
                new TableCellItem(classUserRecord.Score + (currentClassUserRecord == null ? GetTrendImage(classUserRecord) : "")),
                new TableCellItem((currentClassUserRecord?.Score ?? "-") + (currentClassUserRecord == null ? "" : GetTrendImage(currentClassUserRecord)))
            };
        }).ToList();

        return EmailBuilder.BuildTableHtml(headers, tableRowData, 1, 10);


        static string GetTrendImage(ClassUserModel classUserRecord)
        {
            return classUserRecord.Trend switch
            {
                Trend.Upwards => $"<img src='{ApplicationProperties.TRENDING_UP_IMAGE_URL}' alt='Trending Up' />",
                Trend.Downwards => $"<img src='{ApplicationProperties.TRENDING_DOWN_IMAGE_URL}' alt='Trending Down' />",
                _ => null,
            };
        }

        static string FormatSeconds(int seconds)
        {
            var timeParts = new List<string>();
            var timeSpan = new TimeSpan(0, 0, seconds);

            if (timeSpan.TotalDays >= 1)
            {
                timeParts.Add($"{timeSpan.Days}d");
            }

            if (timeSpan.TotalHours >= 1)
            {
                timeParts.Add($"{timeSpan.Hours}h");
            }

            timeParts.Add($"{timeSpan.Minutes}m");

            return string.Join(" ", timeParts);
        }
    }
}
