CREATE PROCEDURE Orientation.StartOrientation(
	@userId INT
)
AS
SET NOCOUNT ON

UPDATE Common.Users
SET 
	OrientationStartTime = SYSDATETIME()
	, EnrollmentDate = ISNULL(EnrollmentDate, SYSDATETIME())
	, UnenrollmentDate = NULL 
WHERE Id = @userId
