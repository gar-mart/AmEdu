CREATE PROCEDURE Orientation.ReturnStudentPictures(
	@year INT = NULL
)
AS
SET NOCOUNT ON

SELECT 
	a.Name StudentName
	, c.Picture StudentPicture
FROM 
	Common.vwUsers a
	LEFT JOIN Orientation.Step_SendUsASelfie c on a.Id = c.UserId
WHERE 
	a.IsStaff = 0 AND a.IsActive = 1 AND c.Picture is not null
ORDER BY 
	StudentName