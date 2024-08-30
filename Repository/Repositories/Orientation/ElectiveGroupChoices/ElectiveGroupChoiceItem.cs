using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Orientation.ElectiveGroupChoices;

[TableMetaData("Orientation", "ElectiveGroupChoices", "ElectiveGroupChoice")]
public class ElectiveGroupChoiceItem: IBaseModel
{
    public int ElectiveId { get; set; }

    public int ElectiveGroupId { get; set; }
}
