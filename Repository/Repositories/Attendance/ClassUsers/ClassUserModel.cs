using System;

using Repository.Repositories.Attendance.Tardiness;

using Shared.Buzz;

namespace Repository.Repositories.Attendance.ClassUsers;

public class ClassUserModel: ClassUserItem, IClassUserWorkSummary
{
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProfilePicture { get; set; }
    public bool HasLiveLessonPoint { get; set; }
    public int IntegrityPoints { get; set; }
    public int StewardshipPoints { get; set; }
    public int RespectPoints { get; set; }
    public int EngagementPoints { get; set; }
    public string ClassName { get; set; }
    public decimal OnlineHoursSpentThisWeek { get; set; }
    public int LiveLessonPoints { get; set; } // when a ClassUser for a date range
    public Trend Trend { get; set; } = Trend.Flat;
    public decimal TrendDifference { get; set; }
    public Tardy? Tardiness { get; set; }
    public string TardinessComment { get; set; }
    public int AssignmentsCompleted { get; set; }
    public int AssignmentsCompletedDateRange { get; set; }
    public int AssignmentsInGracePeriod { get; set; }
    public int TotalAssignments { get; set; }
    public int TotalAssignmentsDateRange { get; set; }
    public int AssignmentsCompletedOnTime { get; set; }
    public int TotalAssignmentsUpUntilEndDate { get; set; }
    public int AssignmentsCompletedUpUntilEndDate { get; set; }
    public int AssignmentsAssignedDateRange { get; set; }
    public string AbsenceReason { get; set; }
    public DateTime? AbsenceStartDate { get; set; }
    public DateTime? AbsenceEndDate { get; set; }
    public int AbsenceId { get; set; }
    public int LiveLessonsOffered { get; set; }

    public string BuzzId(ApiType apiType)
    {
        return apiType switch
        {
            ApiType.Connexus => ConnexusId.ToString(),
            ApiType.LincolnLearning => LincolnLearningId.ToString(),
            ApiType.FlexPoint => FlexPointId.ToString(),
            _ => throw new NotImplementedException(apiType.ToString())
        };
    }
}

public enum Trend
{
    Downwards = -1,
    Flat = 0,
    Upwards = 1
}
