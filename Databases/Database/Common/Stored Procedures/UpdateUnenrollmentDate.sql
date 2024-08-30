CREATE PROCEDURE Common.UpdateUnenrollmentDate (
	@studentId INT
	, @unenrollmentDate DATE
)
AS
SET NOCOUNT ON

UPDATE Common.Users SET
	UnenrollmentDate = @unenrollmentDate
WHERE @studentId = Id
