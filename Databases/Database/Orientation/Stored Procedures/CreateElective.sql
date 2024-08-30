CREATE PROCEDURE Orientation.CreateElective (
	@name NVARCHAR(500)
	, @isCommunityPassportElective BIT
	, @hasPrerequisite BIT
	, @isCommunityPassportElectiveAlternate BIT
	, @choiceGroupId INT
	, @choiceGroupElectivesRequired INT
	, @semesterElectives Tvp.SemesterElectiveList READONLY
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	INSERT INTO Orientation.Electives
	(Name, IsCommunityPassportElective, HasPrerequisite, IsCommunityPassportElectiveAlternate)
	VALUES 
	(@name, @isCommunityPassportElective, @hasPrerequisite, @isCommunityPassportElectiveAlternate)

	SET @newId = SCOPE_IDENTITY()

	INSERT INTO Orientation.SemesterElectives 
	(GradeLevel, Semester, ElectiveId)
	SELECT a.GradeLevel, a.Semester, @newId
	FROM @semesterElectives a

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
GO