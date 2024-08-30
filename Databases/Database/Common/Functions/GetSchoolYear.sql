-- Overload to CurrentSchoolYear with a specified DATETIME
CREATE FUNCTION Common.GetSchoolYear(@easternTime DATETIME2(7))
RETURNS Common.SchoolYear
AS
BEGIN    
	-- if the month is July or later, the school year is the same year as right now
	RETURN YEAR(@easternTime) - IIF(MONTH(@easternTime) >= 7, 0, 1)
END