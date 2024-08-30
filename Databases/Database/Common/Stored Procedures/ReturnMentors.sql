CREATE PROCEDURE Common.ReturnMentors (
	@hasMentees BIT
)
AS
SET NOCOUNT ON

SELECT
	a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.Email
FROM Common.vwUsers a
CROSS APPLY (SELECT COUNT(*) StudentsMentored FROM Common.Users b WHERE b.MentorId = a.Id) c
WHERE
	a.IsStaff = 1
	AND a.IsActive = 1
	AND (
		a.Email LIKE '%AmEduglobal.org'
		AND (
			@hasMentees IS NULL
			OR @hasMentees = 0 
			AND c.StudentsMentored = 0
		)
		OR @hasMentees = 1 AND c.StudentsMentored > 0
	)
	
ORDER BY a.LastName