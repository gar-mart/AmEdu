CREATE PROCEDURE Student.ReturnReFuelReservations (
	@week DATE -- start of school week (Monday)
)
AS
SET NOCOUNT ON
	
-- 1. ReFuel Reservations
DECLARE @Reservations TABLE (
	StudentId INT
	, [Date] DATE
	, [Type] TINYINT
	, RejectReasonType TINYINT
	, RejectReasonComment NVARCHAR(500)
	, StandByPosition INT
	, GeneralInquiryResponse NVARCHAR(250)
	, BreakfastInquiryResponse NVARCHAR(250)
	, LunchInquiryResponse NVARCHAR(250)
	, CreatedUserId INT
	, CreatedDate DATETIME2(0)
	, UpdatedUserId INT
	, UpdatedDate DATETIME2(0)
	, CreatedUserName NVARCHAR(100)
	, UpdatedUserName NVARCHAR(100)
	, LastCheckIn DATETIME2(0)
	, LastCheckOut DATETIME2(0)
)

INSERT INTO @Reservations OUTPUT INSERTED.* 
SELECT 
	StudentId
	, [Date]
	, [Type]
	, RejectReasonType
	, RejectReasonComment
	, StandbyPosition
	, r.GeneralInquiryResponse
	, r.BreakfastInquiryResponse
	, r.LunchInquiryResponse
	, r.CreatedUserId
	, r.CreatedDate
	, r.UpdatedUserId
	, r.UpdatedDate
	, CreatedUser.Name CreatedUserName
	, UpdatedUser.Name UpdatedUserName
	, LastLog.CheckedIn LastCheckIn
	, LastLog.CheckedOut LastCheckOut
FROM Student.ReFuelReservations r
INNER JOIN Common.Users Student ON StudentId = Student.Id
INNER JOIN Common.Users CreatedUser ON r.CreatedUserId = CreatedUser.Id
LEFT JOIN Common.Users UpdatedUser ON r.UpdatedUserId = UpdatedUser.Id 
OUTER APPLY (
	SELECT TOP 1
		CheckedIn
		, CheckedOut
	FROM Student.ReFuelLogs
	WHERE r.StudentId = ReFuelLogs.StudentId
		AND r.Date = ReFuelLogs.Date
	ORDER BY ISNULL(CheckedOut, CheckedIn) DESC
) LastLog
WHERE @week <= [Date] 
	AND [Date] < DATEADD(WEEK, 1, @week)
ORDER BY [Date]	
	, Student.LastName
	, Student.FirstName

-- 2. Students
SELECT 
	Id
	, LastName + ', ' + FirstName Name
FROM Common.Users a
WHERE Id IN (SELECT StudentId FROM @Reservations)