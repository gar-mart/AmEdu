CREATE PROCEDURE Orientation.Step_UserElectives_Submit(
	@userId INT
	, @electveList Tvp.UserElectiveList READONLY
)
AS
SET NOCOUNT ON

-- consider the current user's gradelevel as the next gradelevel if the month is May or June (we can do something like this for Orientation.Steps in the future)
;WITH TRG AS (
	SELECT * 
	FROM Orientation.Step_UserElectives userElectives
	WHERE
		UserId = @userId
		AND EXISTS (
			SELECT * 
			FROM @electveList electives
			WHERE userElectives.GradeLevel = electives.GradeLevel
				AND userElectives.Semester = electives.Semester
		)
)
MERGE TRG
USING @electveList SRC ON 
	TRG.UserId = @userId 
	AND TRG.GradeLevel = SRC.GradeLevel 
	AND TRG.Semester = SRC.Semester 
	AND TRG.ElectiveId = SRC.ElectiveId
WHEN NOT MATCHED THEN INSERT(UserId, GradeLevel, Semester, ElectiveId) VALUES (
	@userId
	, SRC.GradeLevel
	, SRC.Semester
	, SRC.ElectiveId)
WHEN NOT MATCHED BY SOURCE AND IsLockedIn = 0 THEN DELETE;

