CREATE PROCEDURE Orientation.UpdateElectiveGroup
	@id INT
	, @semester INT
	, @numberOfRequiredChoices INT
AS
SET NOCOUNT ON

UPDATE Orientation.ElectiveGroups
SET 
	NumberOfRequiredChoices = @numberOfRequiredChoices 
	, Semester = @semester
WHERE Id = @id