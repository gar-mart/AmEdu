CREATE PROCEDURE Student.UpdateReFuelLogs (
	@studentId INT
	, @date DATE
	, @logs Tvp.Logs READONLY
	, @currentUserId INT
)
AS
SET NOCOUNT ON

;MERGE Student.ReFuelLogs USING @logs Logs ON Logs.Id = ReFuelLogs.Id
WHEN MATCHED THEN UPDATE SET
	CheckedIn = [In]
	, CheckedOut = [Out]
	, [Date] = @date
	, UpdatedUserId = IIF([In] <> CheckedIn OR [Out] <> CheckedOut, @currentUserId, UpdatedUserId)
	, UpdatedDate = IIF([In] <> CheckedIn OR [Out] <> CheckedOut, SYSUTCDATETIME(), UpdatedDate)
WHEN NOT MATCHED THEN INSERT (StudentId, CheckedIn, CheckedOut, Date, CreatedUserId) VALUES (
	@studentId
	, [In]
	, [Out]
	, @date
	, @currentUserId
)
WHEN NOT MATCHED BY SOURCE AND StudentId = @studentId AND [Date] = @date THEN DELETE;