using System.Collections.Generic;

using Repository.Repositories.Orientation.ElectiveGroupChoices;

namespace Repository.Repositories.Orientation.ElectiveGroups;

public class ElectiveGroupModel: ElectiveGroupItem
{
    public List<ElectiveGroupChoiceModel> ElectiveGroupChoices { get; set; } = new List<ElectiveGroupChoiceModel>();
}
