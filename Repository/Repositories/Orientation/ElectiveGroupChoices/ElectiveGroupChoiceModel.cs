using System.Collections.Generic;

namespace Repository.Repositories.Orientation.ElectiveGroupChoices;

public class ElectiveGroupChoiceModel: ElectiveGroupChoiceItem
{
    public string Name { get; set; }

    public List<SemesterElectiveItem> SemesterElectives { get; set; } = new List<SemesterElectiveItem>();
}
