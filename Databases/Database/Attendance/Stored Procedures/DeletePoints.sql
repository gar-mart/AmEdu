CREATE PROCEDURE Attendance.DeletePoints (
	@id INT
)
AS
SET NOCOUNT ON
	
DELETE Attendance.Points
WHERE Id = @id