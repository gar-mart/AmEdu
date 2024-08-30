CREATE PROCEDURE Attendance.ReturnClasses(
	@date DATE
	, @staffId INT  --optional staff Id, pass in NULL if NOT limiting to 'my' classes
	, @searchTerm NVARCHAR(30)
)
AS
SET NOCOUNT ON

SET @searchTerm = '%' + REPLACE(COALESCE(@searchTerm, ''), ' ', '') + '%'

SELECT
	a.Id
	, a.Name
	, a.StartDate
	, a.EndDate
FROM Attendance.vwClasses a
LEFT JOIN Attendance.vwClassUsers b ON a.Id = b.ClassId AND b.UserId = @staffId
WHERE
	@date BETWEEN CAST(a.StartDate AS DATE) and CAST(a.EndDate AS DATE)
	AND (
		b.UserId = @staffId 
		AND @searchTerm = '%%' 
		AND b.Status = 1 -- only show active teacher enrollments
		AND b.IsDeleted = 0
		AND @date BETWEEN CAST(ISNULL(b.StartDate, @date) AS DATE) AND CAST(ISNULL(b.EndDate, @date) AS DATE)
		OR @searchTerm <> '%%'
	)
	AND REPLACE(COALESCE(a.Name, ''), ' ', '') LIKE @searchTerm
	AND a.IsDeleted = 0
ORDER BY
	a.Name
	