CREATE PROCEDURE Student.UpdateStudentResourceAndMetadata
	@id INT
	, @title NVARCHAR(50)
	, @category NVARCHAR(50)
	, @url NVARCHAR(MAX)
	, @showOnStudentDashboard BIT
	, @gradeLevels Tvp.GradeLevelList READONLY
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	UPDATE Student.StudentResources
	SET 
		Title = @title
		, Category = @category
		, Url = @url
		, ShowOnStudentDashboard = @showOnStudentDashboard
	WHERE 
		Id = @id

	; WITH StudentResource AS (
		SELECT * 
		FROM Student.StudentResourceGradeLevel 
		WHERE StudentResourceId = @id
	)
	MERGE StudentResource USING @gradeLevels GradeLevels 
		ON StudentResource.GradeLevel = GradeLevels.GradeLevel
	WHEN NOT MATCHED THEN
		INSERT (StudentResourceId, GradeLevel)
		VALUES (@id, GradeLevels.GradeLevel)
	WHEN NOT MATCHED BY SOURCE THEN
		DELETE;

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH