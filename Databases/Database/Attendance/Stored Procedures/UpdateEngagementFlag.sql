CREATE PROCEDURE Attendance.UpdateEngagementFlag (
	@currentUserId INT
	, @id INT
	, @approvedStatus BIT
	, @rejectedReason NVARCHAR(250)
	, @interventionLevel TINYINT -- currently possible options are: NULL (not selected by user), 0 (warning), 1 (level 1)
)
AS
SET NOCOUNT ON

IF NOT ( 
	EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND (IsAdmin = 1 OR IsInterventionist = 1))
	OR EXISTS (SELECT * FROM Attendance.EngagementFlags a INNER JOIN Common.Users b ON a.UserId = b.Id WHERE a.Id = @id AND b.MentorId = @currentUserId)
)
	THROW 50000, 'User unauthorized to update this engagement flag', 0 

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION
		DECLARE @StudentId INT
			, @WeekOfDate DATE
			, @SchoolYear Common.SchoolYear

		UPDATE Attendance.EngagementFlags SET
			StaffId = @currentUserId
			, ApprovedStatus = @approvedStatus
			, RejectedReason = IIF(@approvedStatus = 0, @rejectedReason, NULL)

			, @WeekOfDate = WeekOfDate
			, @StudentId = UserId
			, @SchoolYear = Common.GetSchoolYear(WeekOfDate)
		WHERE
			Id = @id
			AND (
			-- don't allow an engagement flag to be double approved
				@approvedStatus = 0
				OR NULLIF(ApprovedStatus, 0) IS NULL 
			)

		IF @approvedStatus = 1 
			AND @SchoolYear = Common.CurrentSchoolYear() 
			AND NOT EXISTS (SELECT * FROM Attendance.Interventions WHERE EngagementFlagId = @id) 
		BEGIN
			-- Generate an intervention if the engagement flag was approved, it was for this school year, and an intervention hasn't been created yet

			DECLARE	@LogOnlyIntervention BIT = 0

			IF @interventionLevel IS NULL
			BEGIN
				;WITH CurrentInterventions AS (
					SELECT i.*, ef.WeekOfDate
					FROM Attendance.Interventions i 
					INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
					WHERE YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1) = Common.CurrentSchoolYear()
						AND ef.UserId = @StudentId	
						-- ignore LogOnly and Voided interventions
						AND i.LogOnly = 0
						AND i.Status <> 3 -- Voided
				)
				SELECT @interventionLevel = Next.Level
					-- log the intervention: 
					-- if there is a level 3 in progress 
					-- if the next level is 4 and a level 4 has already been generated
					-- if it has been less than 7 days since the last generated intervention
					, @LogOnlyIntervention = IIF(
						EXISTS(SELECT * FROM CurrentInterventions i WHERE i.Level = 3 AND i.Status = 0)
						OR Next.Level = 4 AND EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = Next.Level)
						OR EXISTS (
							SELECT * 
							FROM Common.GetBeginningOfWeek(DEFAULT) CurrentSchoolWeek
							CROSS APPLY (
								SELECT MAX(i.GeneratedDate) GeneratedDate
								FROM CurrentInterventions i
							) LastIntervention
							WHERE LastIntervention.GeneratedDate BETWEEN CurrentSchoolWeek.BeginningOfWeek AND DATEADD(WEEK, 1, CurrentSchoolWeek.BeginningOfWeek)
						)
						, 1, 0)
				FROM (
					SELECT CASE
						-- if a level 4 intervention exists, then 4 it must be.
						WHEN EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = 4) THEN 4
						-- if a level 1 intervention doesn't exist
						WHEN NOT EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = 1) THEN 1
						-- if a level 2 intervention doesn't exist
						WHEN NOT EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = 2) THEN 2 
						-- if a level 3 intervention doesn't exist, one is in progress, or if it has been at least 28 days since the last level 3 intervention
						WHEN NOT EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = 3) 
							OR EXISTS (SELECT * FROM CurrentInterventions i WHERE i.Level = 3 AND i.Status = 0)
							OR 28 < DATEDIFF(DAY
								, (SELECT MAX(i.CompletedDate) FROM CurrentInterventions i) -- most recently completed intervention date
								, @WeekOfDate -- engagement flag Week Of date
							)
						THEN 3
						-- in all other cases, generate a level 4
						ELSE 4
					END Level
				) Next

				IF @LogOnlyIntervention = 0
					-- if we are generating a full intervention, we need to close any in progress interventions this student may have
					UPDATE i SET
						Status = 2 -- NOT COMPLETE
						, CompletedDate = SYSUTCDATETIME()
						-- not setting CompletedByUserId so that it the user that completed the intervention will show up as "System"
					FROM Attendance.Interventions i
					INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
					WHERE i.Status = 0
						AND ef.UserId = @StudentId
						And Common.CurrentSchoolYear() = i.SchoolYear
			END
			ELSE IF EXISTS (
				SELECT * 
				FROM Attendance.Interventions i 
				INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
				WHERE ef.UserId = @StudentId AND @SchoolYear = YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1)
			)			
				RETURN 1 -- User cannot select an intervention level since at least one intervention has already been generated for the selected school year		

			INSERT INTO Attendance.Interventions (Id, GeneratedByUserId, GeneratedDate, Level, LogOnly, SchoolYear, Status) VALUES (
				@id
				, @currentUserId
				, SYSUTCDATETIME()
				, @interventionLevel
				, @LogOnlyIntervention
				, @SchoolYear
				, 0
			)	
		END
	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
