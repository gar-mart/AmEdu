using System.Collections.Generic;

using Repository.Repositories.Orientation.ElectiveGroupChoices;

namespace Repository.Repositories.Orientation.Electives;

public class ElectiveModel: ElectiveItem
{
    public List<SemesterElectiveItem> SemesterElectives { get; set; } = new List<SemesterElectiveItem>();

    public List<ElectiveGroupChoiceItem> ElectiveGroupChoices { get; set; } = new List<ElectiveGroupChoiceItem>();
}
