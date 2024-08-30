namespace Repository.Repositories.Staff;

public class CommunicationListEntryItem
{
    public int CommunicationListId { get; set; }
    public int UserId { get; set; }
    public bool IncludeStudent { get; set; }
    public bool IncludeGuardian1 { get; set; }
    public bool IncludeGuardian2 { get; set; }
    public bool IncludeMentor { get; set; }
    public bool IncludeStaff { get; set; }
}
