CREATE PROCEDURE Attendance.AcknowledgeEngagementFlag (
	@id INT
	, @acknowledgedByStudent BIT
)
AS
SET NOCOUNT ON
	
UPDATE Attendance.EngagementFlags
SET AcknowledgedByStudent = @acknowledgedByStudent
WHERE Id = @id