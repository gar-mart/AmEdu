using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Orientation.ElectiveSetting;

[TableMetaData("Orientation", "ElectiveSettings", "ElectiveSetting")]
public class ElectiveSettingItem
{
    public string GradeLevel { get; set; }

    public int RequiredElectivesPerSemester1 { get; set; }

    public int RequiredElectivesPerSemester2 { get; set; }
}
