CREATE PROCEDURE Student.ReserveReFuelReservation (
	@currentUserId INT
	, @date DATE
	, @type TINYINT -- 1: Breakfast, 2: Lunch, 3: Breakfast & Lunch
	, @generalInquiryResponse NVARCHAR(250) 
	, @breakfastInquiryResponse NVARCHAR(250)
	, @lunchInquiryResponse NVARCHAR(250)
	, @openSpot BIT OUTPUT
	, @standbyPosition BIT OUTPUT
)
AS
SET NOCOUNT ON

-- default to false
SET @openSpot = 0
SET @standbyPosition = 0

DECLARE @Result TABLE (StandbyPosition INT)

;WITH Target AS (
	SELECT *
	FROM Student.ReFuelReservations
	WHERE StudentId = @currentUserId
		AND [Date] = @date
), Source AS (
	SELECT
		@currentUserId StudentId
		, @date [Date]
		, @type [Type]
		, IIF(a.MaxOpenPositions > b.Reservations, NULL, b.Reservations - a.MaxOpenPositions + 1) StandbyPosition
	FROM Student.IsReFuelEligible(@currentUserId, @date) c
	CROSS APPLY (
		SELECT *
		FROM Staff.ReFuel
	) a
	CROSS APPLY (
		SELECT Reservations = COUNT(*)
		FROM Student.ReFuelReservations
		WHERE [Date] = @date
			AND RejectReasonType IS NULL
	) b
	WHERE a.MaxOpenPositions + a.MaxStandbyPositions > b.Reservations
		AND c.AllRequirementsMet = 1
)
MERGE Target USING Source ON
	Target.StudentId = Source.StudentId
	AND Target.[Date] = Source.[Date]
WHEN NOT MATCHED THEN INSERT (StudentId, [Date], CreatedUserId, StandbyPosition, [Type], GeneralInquiryResponse, BreakfastInquiryResponse, LunchInquiryResponse) VALUES (
	Source.StudentId
	, Source.[Date]
	, Source.StudentId
	, Source.StandbyPosition
	, Source.[Type]
	, @generalInquiryResponse
	, @breakfastInquiryResponse
	, @lunchInquiryResponse
)
WHEN MATCHED THEN UPDATE SET 
	RejectReasonType = NULL
	, StandbyPosition = Source.StandbyPosition
	, UpdatedUserId = Source.StudentId
	, UpdatedDate = SYSUTCDATETIME()
	, [Type] = Source.[Type]
	, GeneralInquiryResponse = @generalInquiryResponse
	, BreakfastInquiryResponse = @breakfastInquiryResponse
	, LunchInquiryResponse = @lunchInquiryResponse
OUTPUT INSERTED.StandbyPosition INTO @Result;

SELECT 
	@openSpot = IIF(StandbyPosition IS NULL, 1, 0)
	, @standbyPosition = IIF(StandbyPosition IS NULL, 0, 1)
FROM @Result