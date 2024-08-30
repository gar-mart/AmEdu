CREATE PROCEDURE Common.UpdateEnrollmentDate (
	@studentId INT
	, @enrollmentDate DATE
)
AS
SET NOCOUNT ON

UPDATE Common.Users SET
	EnrollmentDate = @enrollmentDate
WHERE @studentId = Id
