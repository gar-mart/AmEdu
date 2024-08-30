CREATE PROCEDURE Orientation.UpdateElective
	@id INT
	, @name NVARCHAR(500)
	, @isCommunityPassportElective BIT
	, @hasPrerequisite BIT
	, @isCommunityPassportElectiveAlternate BIT
	, @choiceGroupId INT
	, @choiceGroupElectivesRequired INT
	, @semesterElectives Tvp.SemesterElectiveList READONLY
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	UPDATE Orientation.Electives
	SET 
		Name = @name
		, IsCommunityPassportElective = @isCommunityPassportElective
		, HasPrerequisite = @hasPrerequisite
		, IsCommunityPassportElectiveAlternate = @isCommunityPassportElectiveAlternate
	WHERE 
		Id = @id

	; WITH SemesterElectives AS (
		SELECT * 
		FROM Orientation.SemesterElectives
		WHERE ElectiveId = @id
	)
	MERGE SemesterElectives USING @semesterElectives SemesterElectiveList
		ON SemesterElectives.Semester = SemesterElectiveList.Semester
		AND SemesterElectives.GradeLevel = SemesterElectiveList.GradeLevel
	WHEN NOT MATCHED THEN
		INSERT (GradeLevel, Semester, ElectiveId)
		VALUES (SemesterElectiveList.GradeLevel, SemesterElectiveList.Semester, @id)
	WHEN NOT MATCHED BY SOURCE THEN
		DELETE;

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
GO
