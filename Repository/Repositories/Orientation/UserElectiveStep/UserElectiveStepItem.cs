using System.Collections.Generic;

namespace Repository.Repositories.Orientation;

public class UserElectivesStepItem
{
    public int UserId { get; set; }
    public List<UserElectiveStepItem> ElectiveList { get; set; }
}

public class UserElectiveStepItem
{
    public byte Semester { get; set; }
    public int ElectiveId { get; set; }
    public string GradeLevel { get; set; }
    public bool IsLockedIn { get; set; }
}
