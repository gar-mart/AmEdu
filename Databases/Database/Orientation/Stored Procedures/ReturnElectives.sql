CREATE PROCEDURE Orientation.ReturnElectives
AS
SET NOCOUNT ON
	
SELECT 
	a.Id
	, a.Name
	, a.IsCommunityPassportElective
	, a.HasPrerequisite
	, a.IsCommunityPassportElectiveAlternate
	, a.ChoiceGroupId
	, a.ChoiceGroupElectivesRequired
FROM Orientation.Electives a
ORDER BY a.Name

SELECT 
	b.GradeLevel
	, b.Semester
	, b.ElectiveId
FROM Orientation.SemesterElectives b

SELECT 
	c.Id
	, c.ElectiveId
	, c.ElectiveGroupId
FROM Orientation.ElectiveGroupChoices c