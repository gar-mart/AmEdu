using System;

namespace Repository.Repositories.Student;

public class ReFuelEligibilityModel
{
    public int StudentId { get; set; }
    public DateTime ReservationDate { get; set; }
    public bool AllRequirementsMet { get; set; }
    public bool CanClaimOpenSpot { get; set; }
    public bool CanClaimStandbyPosition { get; set; }
    public bool GradeRequirementMet { get; set; }
    public bool LiveLessonRequirementMet { get; set; }
    public bool PassingClassesRequirementMet { get; set; }
    public bool ReservationRejectedRequirementMet { get; set; }
    public bool BreakfastOffered { get; set; }
    public bool LunchOffered { get; set; }
    public string GeneralInquiry { get; set; }
    public string BreakfastInquiry { get; set; }
    public string LunchInquiry { get; set; }
}
