using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Orientation.ElectiveGroups;

[TableMetaData("Orientation", "ElectiveGroups", "ElectiveGroup")]
public class ElectiveGroupItem: IBaseModel
{
    public int Semester { get; set; }

    public int NumberOfRequiredChoices { get; set; }
}
