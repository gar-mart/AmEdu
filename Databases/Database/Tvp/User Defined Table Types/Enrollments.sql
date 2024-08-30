CREATE TYPE Tvp.Enrollments AS TABLE(
	-- From Import data
	FirstName NVARCHAR(500)
	, LastName NVARCHAR(500)
	, EnrollmentDate DATE
	, UnenrollmentDate DATE
	, UICNumber BIGINT
	-- From Attendance.MatchAndReturnEnrollments
	, Id INT
)

