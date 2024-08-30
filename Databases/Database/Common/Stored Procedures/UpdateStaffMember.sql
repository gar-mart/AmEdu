CREATE PROCEDURE Common.UpdateStaffMember (
	@id INT
	, @appointmentLink NVARCHAR(500)
	, @introVideoId NVARCHAR(25)
	, @mentorGrades Tvp.GradeLevelList READONLY
	, @counselorGrades Tvp.GradeLevelList READONLY
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	UPDATE Common.Users SET
		AppointmentLink = @appointmentLink
	WHERE Id = @id

	MERGE Orientation.IntroVideos USING (SELECT @id StaffId) SRC ON MentorId = StaffId
	WHEN MATCHED THEN UPDATE SET Link = @introVideoId
	WHEN NOT MATCHED THEN INSERT (MentorId, Link) VALUES (@id, @introVideoId)
	WHEN NOT MATCHED BY SOURCE AND MentorId = @id THEN DELETE;

	MERGE Common.Mentors USING @mentorGrades Grades ON Mentors.GradeLevel = Grades.GradeLevel AND Mentors.UserId = @id
	WHEN NOT MATCHED THEN INSERT (UserId, GradeLevel) VALUES (@id, Grades.GradeLevel)
	WHEN NOT MATCHED BY SOURCE AND UserId = @id THEN DELETE;

	MERGE Common.Counselors USING @counselorGrades Grades ON Counselors.GradeLevel = Grades.GradeLevel AND Counselors.UserId = @id
	WHEN NOT MATCHED THEN INSERT (UserId, GradeLevel) VALUES (@id, Grades.GradeLevel)
	WHEN NOT MATCHED BY SOURCE AND UserId = @id THEN DELETE;

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH