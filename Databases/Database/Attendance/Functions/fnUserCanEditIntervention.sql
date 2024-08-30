-- Summary:
--   Users can edit interventions only if they are either an admin, interventionist, the student's mentor, or a counselor for the student's grade level
CREATE FUNCTION Attendance.fnUserCanEditIntervention (
	@userId INT
	, @interventionId INT
	, @status TINYINT -- 0 = InProgress, 1 = Completed, 2 = Uncompleted, 3 = Voided
)
RETURNS BIT AS
BEGIN
	 RETURN (IIF(EXISTS(
		 SELECT *
		 FROM Common.vwUsers Staff
		 CROSS JOIN Attendance.Interventions i
		 INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
		 INNER JOIN Common.Users Student ON ef.UserId = Student.Id
		 WHERE Staff.Id = @userId
			AND i.Id = @interventionId
			-- Staff must be the student's mentor, an admin, the interventionist, or the counselor
			AND (
				Staff.Id = Student.MentorId
				OR Staff.IsAdmin =1
				OR Staff.IsInterventionist = 1
				OR EXISTS (SELECT * FROM Common.Counselors WHERE GradeLevel = Student.GradeLevel AND UserId = Staff.Id)
			)
			-- If the status is changing, the user must be an interventionist to change to the status of 3 or 0
			AND (
				@status IS NULL
				OR @status = 1
				-- only interventionists can change the status to 0 or 3
				OR Staff.IsInterventionist = 1 AND @status IN (0, 3)
				-- status = 2 is not supported
			)
		), 1, 0)
	)
END