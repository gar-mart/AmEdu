namespace Repository.Repositories.Orientation;

public class SemesterElectiveItem
{
    public short Semester { get; set; }
    public int ElectiveId { get; set; }
    public string Name { get; set; }
    public bool IsSelected { get; set; }
    public bool IsLockedIn { get; set; }
    public bool IsCommunityPassportElective { get; set; }
    public bool IsCommunityPassportElectiveAlternate { get; set; }
    public bool HasPrerequisite { get; set; }
    public int? ChoiceGroupId { get; set; }
    public int? ChoiceGroupElectivesRequired { get; set; }
    public string GradeLevel { get; set; }
}
