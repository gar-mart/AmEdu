CREATE PROCEDURE Staff.SaveCommunicationList (
	@id INT
	, @name NVARCHAR(50)
	, @entries Staff.CommunicationListEntry READONLY
	, @currentUserId INT
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DECLARE @CommunicationListId INT 

	MERGE Staff.CommunicationLists TRG USING (SELECT @id Id) SRC ON
		TRG.Id = SRC.Id
	WHEN MATCHED AND StaffId = @currentUserId THEN UPDATE SET 
		Name = @name
		, @CommunicationListId = @id
	WHEN NOT MATCHED THEN INSERT (Name, StaffId) VALUES (@name, @currentUserId)
	;

	SET @CommunicationListId = ISNULL(@CommunicationListId, SCOPE_IDENTITY())

	IF @CommunicationListId IS NOT NULL
		MERGE Staff.CommunicationListEntries TRG USING @entries SRC ON
			TRG.UserId = SRC.UserId
			AND TRG.CommunicationListId = @CommunicationListId
		WHEN NOT MATCHED THEN INSERT (
			CommunicationListId
			, UserId
			, IncludeStudent
			, IncludeGuardian1
			, IncludeGuardian2
			, IncludeMentor
			, IncludeStaff
		) VALUES (
			@CommunicationListId
			, SRC.UserId
			, SRC.IncludeStudent
			, SRC.IncludeGuardian1
			, SRC.IncludeGuardian2
			, SRC.IncludeMentor
			, SRC.IncludeStaff
		)
		WHEN MATCHED THEN UPDATE SET
			IncludeStudent = SRC.IncludeStudent
			, IncludeGuardian1 = SRC.IncludeGuardian1
			, IncludeGuardian2 = SRC.IncludeGuardian2
			, IncludeMentor = SRC.IncludeMentor
			, IncludeStaff = SRC.IncludeStaff
		WHEN NOT MATCHED BY SOURCE AND TRG.CommunicationListId = @CommunicationListId THEN DELETE
		;

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
