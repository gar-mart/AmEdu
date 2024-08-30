CREATE PROCEDURE Attendance.ReturnCommunicationById (
	@id INT
)
AS
SET NOCOUNT ON

SELECT
	a.Id
	, a.StaffId
	, b.Name
	, a.Date
	, a.Type
	, a.Notes
	, a.WasSuccessful
	, a.AwardPoint
FROM Attendance.Communications a
LEFT JOIN Common.Users b ON a.StaffId = b.Id
WHERE
	a.Id = @id
