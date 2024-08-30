CREATE PROCEDURE Student.UpdateStudentResourceGradeLevels
	@studentResourceId INT
	, @gradeLevels Tvp.GradeLevelList READONLY
AS
SET NOCOUNT ON

; WITH StudentResource AS (
	SELECT * 
	FROM Student.StudentResourceGradeLevel 
	WHERE StudentResourceId = @studentResourceId
)
MERGE StudentResource USING @gradeLevels GradeLevels 
	ON StudentResource.GradeLevel = GradeLevels.GradeLevel
WHEN NOT MATCHED THEN
	INSERT (StudentResourceId, GradeLevel)
	VALUES (@studentResourceId, GradeLevels.GradeLevel)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;