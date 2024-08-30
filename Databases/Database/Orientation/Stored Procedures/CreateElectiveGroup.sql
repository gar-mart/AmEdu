CREATE PROCEDURE Orientation.CreateElectiveGroup (
	@semester INT
	, @numberOfRequiredChoices INT
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON 

INSERT INTO Orientation.ElectiveGroups (Semester, NumberOfRequiredChoices)
VALUES (@semester, @numberOfRequiredChoices)

SET @newId = SCOPE_IDENTITY();