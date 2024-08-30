CREATE PROCEDURE Common.ReturnStaffBySearch (
	@searchTerm NVARCHAR(30)
)
AS
SET NOCOUNT ON 

SET @searchTerm = '%' + REPLACE(COALESCE(@searchTerm, ''), ' ', '') + '%'

SELECT
	  a.Id
	, a.GoogleId
	, a.FirstName + ' ' + a.LastName Name
	, a.FirstName
	, a.LastName
	, 1 IsStaff
	, a.Email
	, a.AppointmentLink
	, a.IsMentor
	, a.IsSecondaryMentor
	, a.IsReFuelCoordinator
	, a.IsAdmin
	, a.IsInterventionist
	, a.IsTeacher
FROM Common.vwUsers a
WHERE a.IsStaff = 1
	AND a.IsActive = 1
	AND REPLACE(a.FirstName + a.LastName, ' ', '') LIKE @searchTerm
ORDER BY 
	a.FirstName
	, a.LastName