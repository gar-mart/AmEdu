CREATE PROCEDURE Common.ReturnUserById (
	@userId INT
)
AS
SET NOCOUNT ON

SELECT
	  a.Id
	, a.GoogleId
	, a.Email UserName
	, a.FirstName
	, a.LastName
	, a.Name
	, a.IsStaff
	, a.IsReFuelCoordinator
	, a.IsAdmin
	, a.IsMentor
	, a.IsSecondaryMentor
	, a.IsActive
	, a.AppointmentLink
	, a.ProfilePicture
	, a.GradeLevel
	, a.IsInterventionist
	, a.IsTeacher
	, b.CumulativePoints
	, c.PointBalance
	, ISNULL(j.Picture, a.ProfilePicture) ProfilePicture
FROM Common.vwUsers a
CROSS APPLY (SELECT SUM(b.Value) CumulativePoints FROM Attendance.vwCurrentPoints b WHERE b.UserId = @userId AND b.Type <> 4) b
CROSS APPLY (SELECT SUM(c.Value) PointBalance FROM Attendance.vwCurrentPoints c WHERE c.UserId = @userId) c
LEFT JOIN Orientation.Step_SendUsASelfie j ON a.Id = j.UserId
WHERE a.Id = @userId
GO

