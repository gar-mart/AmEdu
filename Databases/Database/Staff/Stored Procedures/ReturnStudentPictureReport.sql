CREATE PROCEDURE Staff.ReturnStudentPictureReport (
	@includePictures BIT
)
AS
SET NOCOUNT ON 

SELECT 
	a.Id
	, a.Name
	, a.GradeLevel
	, a.Email StudentEmail
	, IIF(@includePictures = 1, b.Picture, NULL) StudentPicture
FROM Common.vwUsers a
LEFT JOIN Orientation.Step_SendUsASelfie b ON a.Id = b.UserId
WHERE
	a.IsStaff = 0
	AND a.IsActive = 1
	AND b.Picture IS NOT NULL