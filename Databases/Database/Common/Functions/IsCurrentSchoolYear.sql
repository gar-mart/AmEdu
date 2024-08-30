-- Summary:
--   Determines if the provided date falls in the current school year
CREATE FUNCTION Common.IsCurrentSchoolYear(@EasternTime DATETIME2(7))
RETURNS BIT
AS
BEGIN
	RETURN IIF(Common.CurrentSchoolYear() = Common.GetSchoolYear(@EasternTime), 1, 0)
END
GO