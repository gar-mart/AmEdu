-- Summary:
--   View of all point records for the current school year (July - June)
CREATE VIEW Attendance.vwCurrentPoints
AS 
SELECT Id
	, UserId 
	, StaffId 
	, Date 
	, CreatedDate 
	, Type 
	, Value 
	, CommunicationId 
	, LiveLessonId 
	, Comments 
	, UserSource 
	, PageSource 
	, GradeLevel 
	, MentorId 
FROM Attendance.Points
WHERE 
	-- this calculates the school year based on July 1 start date
	YEAR(Points.Date) - IIF(MONTH(Points.Date) >= 7, 0, 1) 
		=	
	YEAR(Common.CurrentEasternTime()) - IIF(MONTH(Common.CurrentEasternTime()) >= 7, 0, 1)

