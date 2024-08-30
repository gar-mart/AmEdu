using System.Linq;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Student;

[TableMetaData(nameof(Student), "StudentSupportGroups", "StudentSupportGroup")]
public class StudentSupportGroupItem
{
    public int StudentId { get; set; }
    public string StudentFirstName { get; set; }
    public string StudentLastName { get; set; }
    public string StudentEmail { get; set; }

    public int? MentorId { get; set; }
    public string MentorFirstName { get; set; }
    public string MentorLastName { get; set; }
    public string MentorEmail { get; set; }

    public string GuardianName { get; set; }
    public string GuardianFirstName => GuardianName?.Split(" ").FirstOrDefault();
    public string GuardianLastName => GuardianName?.Split(" ").LastOrDefault();
    public string GuardianEmail { get; set; }

    public string SecondaryGuardianName { get; set; }
    public string SecondaryGuardianFirstName => SecondaryGuardianName?.Split(" ").FirstOrDefault();
    public string SecondaryGuardianLastName => SecondaryGuardianName?.Split(" ").LastOrDefault();
    public string SecondaryGuardianEmail { get; set; }
}
