CREATE PROCEDURE Common.ElevateStudentsGrade
AS
SET NOCOUNT ON

DECLARE
	@UserId INT
	, @GradeLevel VARCHAR(10)

-- To be safe...
DECLARE @sql VARCHAR(MAX) = CONCAT(
'SELECT Id, GradeLevel, MentorId INTO [Users '
, CAST(SYSDATETIME() AS DATETIME2(0)) 
, '] FROM Common.vwUsers WHERE IsStaff = 0 AND IsActive = 1 AND GradeLevel IS NOT NULL AND GradeLevel <> ''12'''
)

EXEC(@SQL)

DECLARE StudentsCursor CURSOR LOCAL FAST_FORWARD
FOR SELECT Id, GradeLevel
FROM Common.vwUsers WHERE IsStaff = 0 AND IsActive = 1 AND GradeLevel IS NOT NULL AND GradeLevel <> '12'

OPEN StudentsCursor

FETCH NEXT FROM StudentsCursor INTO @UserId, @GradeLevel

-- adds 1 to the grade level (if 'K', then default to 0 and adds 1)
SET @GradeLevel = CAST(ISNULL(TRY_CAST(@GradeLevel AS INT), 0) + 1 AS NVARCHAR(2))

WHILE @@FETCH_STATUS = 0 BEGIN

	EXEC Common.SetStudentGrade @UserId, @GradeLevel, NULL

	FETCH NEXT FROM StudentsCursor INTO @UserId, @GradeLevel
	
	SET @GradeLevel = CAST(ISNULL(TRY_CAST(@GradeLevel AS INT), 0) + 1 AS NVARCHAR(2))

END

CLOSE StudentsCursor
DEALLOCATE StudentsCursor

-- in 2021, we had some slides that were shown to 8-11th graders before the new school year, 
-- and we need to reassign those slides to target the new 9-12th graders
IF 2021 = YEAR(GETDATE())
BEGIN
	UPDATE Orientation.StepGradeLevel SET
		GradeLevel = '12'
	WHERE GradeLevel = '8' AND StepId IN (
		SELECT Id
		FROM Orientation.Steps
		WHERE ContentFileName IN (
			'semester-electives-scheduling-info'
			, 'sign-up-with-ms-laura'
			, 'semester-electives-community-passport-program'
			, 'semester-electives-more-info'
			, 'choosing-classes'
			, 'conditional-community-passport-form'
		)
	)

	UPDATE Orientation.StepGradeLevel SET
	    GradeLevel = '8'
	FROM Orientation.StepGradeLevel
	WHERE GradeLevel = '5' AND StepId IN (
		SELECT Id
		FROM Orientation.Steps
		WHERE ContentFileName IN (
			'slide',
			'choosing-classes'
		)
	)

	INSERT INTO Orientation.StepGradeLevel (StepId, GradeLevel)
	SELECT StepId, '5'
	FROM Orientation.StepGradeLevel
	WHERE GradeLevel = '4' AND StepId IN (
		SELECT Id
		FROM Orientation.Steps
		WHERE ContentFileName IN (
			'slide',
			'choosing-classes'
		)
	)
END