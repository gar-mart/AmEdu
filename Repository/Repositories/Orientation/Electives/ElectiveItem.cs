using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Orientation.Electives;

[TableMetaData("Orientation", "Electives", "Elective")]
public class ElectiveItem: IBaseModel
{
    public string Name { get; set; }

    public bool IsCommunityPassportElective { get; set; }

    public bool HasPrerequisite { get; set; }

    public bool IsCommunityPassportElectiveAlternate { get; set; }

    public int ChoiceGroupId { get; set; }

    public int ChoiceGroupElectivesRequired { get; set; }
}
