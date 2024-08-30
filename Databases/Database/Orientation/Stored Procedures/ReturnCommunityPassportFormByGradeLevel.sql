CREATE PROCEDURE Orientation.ReturnCommunityPassportFormByGradeLevel
	@gradeLevel NVARCHAR(2)
AS
SET NOCOUNT ON

SELECT
	cpf.Cell
	, cpf.Url
FROM Orientation.vwCommunityPassportForms cpf
INNER JOIN Common.vwGradeLevels gl ON cpf.Cell = gl.Cell
WHERE gl.GradeLevel = @gradeLevel
