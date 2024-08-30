-- Summary:
--   Returns RE:Fuel reservations and eligibility 
CREATE PROCEDURE Student.ReturnReFuelReservationById (
	@studentId INT
	, @date DATE
)
AS
SET NOCOUNT ON

SELECT 
	rr.StudentId
	, rr.[Date]
	, rr.[Type]
	, rr.RejectReasonType
	, rr.RejectReasonComment
	, rr.StandbyPosition
	, rr.GeneralInquiryResponse
	, rr.BreakfastInquiryResponse
	, rr.LunchInquiryResponse
	, rr.CreatedUserId
	, rr.CreatedDate
	, rr.UpdatedUserId
	, rr.UpdatedDate
FROM Student.ReFuelReservations rr
WHERE rr.[Date] = @date
	AND rr.StudentId = @studentId

SELECT 
	e.AllRequirementsMet
	, e.CanClaimOpenSpot
	, e.CanClaimStandbyPosition
	, e.GradeRequirementMet
	, e.LiveLessonRequirementMet
	, e.PassingClassesRequirementMet
	, e.ReservationDate
	, e.StudentId
	, e.BreakfastOffered
	, e.LunchOffered
	, e.GeneralInquiry
	, e.BreakfastInquiry
	, e.LunchInquiry
FROM Student.IsReFuelEligible(@studentId, @date) e