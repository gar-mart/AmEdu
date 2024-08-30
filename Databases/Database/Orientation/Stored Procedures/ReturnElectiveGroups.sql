CREATE PROCEDURE Orientation.ReturnElectiveGroups
AS
SET NOCOUNT ON 

SELECT
	a.Id
	, a.Semester
	, a.NumberOfRequiredChoices
FROM Orientation.ElectiveGroups a

SELECT 
	b.Id
	, c.Name
	, b.ElectiveId
	, b.ElectiveGroupId
FROM Orientation.ElectiveGroupChoices b JOIN Orientation.Electives c
ON b.ElectiveId = c.Id

SELECT 
	d.GradeLevel
	, d.Semester
	, d.ElectiveId
FROM Orientation.SemesterElectives d