namespace Repository.Repositories.Staff;

public class CommunicationListEntryModel: CommunicationListEntryItem
{
    public string UserName { get; set; }
    public string UserEmailAddress { get; set; }
    public string GradeLevel { get; set; }

    public string GuardianName { get; set; }
    public string GuardianEmailAddress { get; set; }

    public string SecondaryGuardianName { get; set; }
    public string SecondaryGuardianEmailAddress { get; set; }

    public string MentorName { get; set; }
    public string MentorEmail { get; set; }

    public bool IsStaff { get; set; }
}
