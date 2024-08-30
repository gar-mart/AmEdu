CREATE PROCEDURE Attendance.ReturnCurrentClassUsers (
	@selectStudents BIT = 1 -- 1 for students only, 0 for teachers only, null for both
)
AS
SET NOCOUNT ON

SELECT 
	a.ClassId
	, a.ConnexusId
	, a.LincolnLearningId
	, a.FlexPointId
	, a.UserId
FROM Attendance.vwCurrentClassUsers a
INNER JOIN Attendance.vwClasses b ON a.ClassId = b.Id
INNER JOIN Common.vwUsers c ON a.UserId = c.Id
WHERE @selectStudents IS NULL
	OR @selectStudents = 1 AND c.IsStaff = 0
	OR @selectStudents = 0 AND c.IsStaff = 1
