CREATE PROCEDURE Orientation.ReturnElectiveSettings
AS
SET NOCOUNT ON

SELECT 
	a.GradeLevel
	, a.RequiredElectivesPerSemester1
	, a.RequiredElectivesPerSemester2
FROM Orientation.ElectiveSettings a
ORDER BY IIF(a.GradeLevel = 'K', 0, CAST(a.GradeLevel AS INT))