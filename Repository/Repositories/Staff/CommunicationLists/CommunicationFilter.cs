using Repository.Repositories.Common.Staff;

namespace Repository.Repositories.Staff;

public class CommunicationFilter
{
    public CommunicationListModel List { get; set; }
    public StaffItem Mentor { get; set; }
    public string[] Grades { get; set; }
    public string Domain { get; set; }
}
