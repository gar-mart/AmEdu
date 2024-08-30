CREATE PROCEDURE Orientation.ReturnElectivesBySearch
	@searchTerm NVARCHAR(30)
AS
SET NOCOUNT ON

SET @searchTerm = '%' + REPLACE(COALESCE(@searchTerm, ''), ' ', '') + '%'

SELECT 
	a.Id
	, a.Name
	, a.IsCommunityPassportElective
	, a.HasPrerequisite
	, a.IsCommunityPassportElectiveAlternate
	, a.ChoiceGroupId
	, a.ChoiceGroupElectivesRequired
FROM Orientation.Electives a
WHERE a.Name LIKE @searchTerm
ORDER BY a.Name

SELECT 
	b.GradeLevel
	, b.Semester
	, b.ElectiveId
FROM Orientation.SemesterElectives b
GO