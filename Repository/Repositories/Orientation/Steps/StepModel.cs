using System.Collections.Generic;

namespace Repository.Repositories.Orientation;

public class StepModel: StepItem
{
    public List<string> GradeLevels { get; set; } = new List<string>();
    public StepContentModel Content { get; set; }
}
