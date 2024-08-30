-- Summary:
--   This script is run on an on-demand basis as requested by AmEdu.
--   They previously asked us to generate a report of all students and their points for the school year.
--   To generate the report: 
--     1. Run this script in SSMS 
--     2. Copy the output "with headers"
--     3. Paste the output into Excel
--     4. Format the columns so that they are wide enough for the data.
--     5. Save the file as "Student Points Report: <start school year>-<end school year>.xlsx"

-- Remarks:
--   Be sure to update the @SchoolYear variable to generate relevant results.

DECLARE @SchoolYear DATE = '2021-07-01' -- July 1, 2021

SELECT 
	Users.Name Student
	, ISNULL(Users.GradeLevel, '') 'Grade Level'
	, Respect.Points 'Respect Points'
	, Integrity.Points 'Integrity Points'
	, Stewardship.Points 'Stewardship Points'
	, Engagement.Points 'Engagement Points'
	, LiveLesson.Points 'Live Lesson Points'
	, Communication.Points 'Communication Points'
	, Respect.Points + Integrity.Points + Stewardship.Points + Engagement.Points + LiveLesson.Points + Communication.Points 'Total Points'
	, Users.Email 'Student Email'
	, CAST(YEAR(@SchoolYear) AS NVARCHAR(4)) + ' - ' + CAST(YEAR(@SchoolYear) + 1 AS NVARCHAR(4)) 'School Year'
FROM Common.vwUsers Users
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 6
) Respect
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 2
) Integrity
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 3
) Stewardship
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 7
) Engagement
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 5
) LiveLesson
CROSS APPLY (
	SELECT ISNULL(SUM(Value), 0) Points
	FROM Attendance.Points
	WHERE UserId = Users.Id
		AND Date >= @SchoolYear
		AND Type = 1
) Communication
WHERE Users.IsActive = 1
	AND Users.IsStaff = 0
