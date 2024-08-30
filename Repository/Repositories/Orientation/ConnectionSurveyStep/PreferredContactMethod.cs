using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation.ConnectionSurveyStep;

public enum PreferredContactMethod
{
    [Display(Name = "Phone")]
    Phone = 1,
    [Display(Name = "Email")]
    Email = 2,
    [Display(Name = "Text")]
    Text = 3
}
