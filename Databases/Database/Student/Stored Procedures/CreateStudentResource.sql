CREATE PROCEDURE Student.CreateStudentResource
	@title NVARCHAR(50)
	, @category NVARCHAR(50)
	, @url NVARCHAR(MAX)
	, @showOnStudentDashboard BIT
	, @gradeLevels Tvp.GradeLevelList READONLY
	, @newId INT OUTPUT
AS
SET NOCOUNT ON
	
BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	INSERT INTO Student.StudentResources
	(Title, Category, Url, ShowOnStudentDashboard)
	VALUES 
	(@title, @category, @url, @showOnStudentDashboard)

	SET @newId = SCOPE_IDENTITY()

	INSERT INTO Student.StudentResourceGradeLevel (StudentResourceId, GradeLevel)
	SELECT @newId, a.GradeLevel
	FROM @gradeLevels a

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH