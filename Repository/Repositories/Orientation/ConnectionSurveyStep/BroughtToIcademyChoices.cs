using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation.ConnectionSurveyStep;

public enum BroughtToAmEduChoices
{
    [Display(Name = "Medical Reasons")]
    MedicalReasons = 1,
    [Display(Name = "Mental Health Reasons")]
    MentalHealthReasons = 2,
    [Display(Name = "Ability to Work Ahead Above")]
    AbilityToWorkAheadAbove = 4,
    [Display(Name = "Dual Enrollment")]
    DualEnrollment = 8,
    [Display(Name = "Plan to Travel While Doing School")]
    PlanToTravelWhileDoingSchool = 16,
    [Display(Name = "Flexible Schedule")]
    FlexibleSchedule = 32,
    [Display(Name = "Preference for Online Learning")]
    PreferenceForOnlineLearning = 64,
    [Display(Name = "Small School Experience")]
    SmallSchoolExperience = 128,
    [Display(Name = "Other")]
    Other = 256
}
