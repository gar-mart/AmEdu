CREATE PROCEDURE Attendance.UpdateEnrollment (
	@enrollmentDate DATE
	, @unenrollmentDate DATE
	, @uicNumber BIGINT
	, @id INT
)
AS
SET NOCOUNT ON

UPDATE Common.Users SET
	EnrollmentDate = @enrollmentDate
	, UnenrollmentDate = @unenrollmentDate
	, UICNumber = @uicNumber
WHERE Id = @id