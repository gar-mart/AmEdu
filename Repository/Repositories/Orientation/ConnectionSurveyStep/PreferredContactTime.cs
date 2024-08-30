using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation.ConnectionSurveyStep;

public enum PreferredContactTime
{
    [Display(Name = "Morning")]
    Morning = 1,
    [Display(Name = "Afternoon")]
    Afternoon = 2,
    [Display(Name = "Evening")]
    Evening = 3,
}
