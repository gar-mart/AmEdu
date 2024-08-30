-- This proc matches enrollment data to AmEdu students by first and last name. 
-- It will return three types of records: 
-- 1. Enrollment data matched to exactly one student
-- 2. Enrollment data matched to more than one student
-- 3. Enrollment data matched to no students
-- The front-end allows the user to verify and fixup the data before submitting it all to the database

CREATE PROCEDURE Attendance.MatchAndReturnEnrollments (
	@enrollments Tvp.Enrollments READONLY
)
AS
SET NOCOUNT ON

;WITH AmEduStudents AS (
	SELECT *
	FROM Common.vwUsers
	WHERE Email LIKE '%@AmEdustudents.org' 
)
SELECT	
	a.Id
	, a.Email
	, a.EnrollmentDate CurrentEnrollmentDate
	, a.UnenrollmentDate CurrentUnenrollmentDate
	, a.UICNumber CurrentUICNumber
	, b.FirstName
	, b.LastName
	, b.EnrollmentDate 
	, b.UnenrollmentDate
	, b.UICNumber
	, c.HasMultipleMatches
FROM @enrollments b
LEFT JOIN AmEduStudents a ON a.FirstName = b.FirstName AND a.LastName = b.LastName AND a.IsStaff = 0
CROSS APPLY (
	SELECT HasMultipleMatches = IIF(1 < (
		SELECT COUNT(*) 
		FROM AmEduStudents c
		WHERE c.FirstName = a.FirstName AND c.LastName = a.LastName AND c.IsStaff = 0
	) OR 1 < (
		SELECT COUNT(*)
		FROM @enrollments c
		WHERE c.FirstName = b.FirstName AND b.LastName = c.LastName
	), 1, 0)
) c
ORDER BY
	a.LastName
	, a.FirstName
