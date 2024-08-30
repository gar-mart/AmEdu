using Repository.Repositories.Attendance.EngagementFlags;

namespace Repository.Repositories.Attendance;

public class InterventionModel: InterventionItem
{
    public InterventionEmailCommunicationItem EmailCommunication { get; set; }
    public InterventionScheduledMeetingItem ScheduledMeeting { get; set; }
    public InterventionSuccessPlanItem SuccessPlan { get; set; }
    public InterventionTruancyFormItem TruancyForm { get; set; }
    public EngagementFlagModel EngagementFlag { get; set; }

    public string GeneratedByUserName { get; set; }
    public string CompletedByUserName { get; set; }
    public string StudentName { get; set; }
    public string StudentGradeLevel { get; set; }
    public string MentorName { get; set; }
    public bool EmailExists { get; set; }
}
