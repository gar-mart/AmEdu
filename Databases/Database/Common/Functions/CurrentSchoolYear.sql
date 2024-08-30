-- Summary:
--   Gets the school year start date for the current Eastern time
CREATE FUNCTION Common.CurrentSchoolYear()
RETURNS Common.SchoolYear
AS
BEGIN
	RETURN Common.GetSchoolYear(Common.CurrentEasternTime())
END
GO