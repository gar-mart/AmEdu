CREATE PROCEDURE Orientation.UpdateCommunityPassportForms
	@items Tvp.CommunityPassportFormLinkList READONLY
AS
SET NOCOUNT ON

;WITH NewLinks AS (
	SELECT 
		CASE 
			WHEN links.Cell = 1 THEN 'K' -- Elementary School
			WHEN links.Cell = 2 THEN '6' -- Middle School
			ELSE '9' -- High School
		END GradeLevel
		, links.Url	
	FROM @items links
), OldLinks AS (
	SELECT * 
	FROM Orientation.Links
	WHERE IsCommunityPassportForm = 1
)
MERGE OldLinks USING NewLinks ON
	OldLinks.GradeLevel = NewLinks.GradeLevel
WHEN NOT MATCHED THEN 
	INSERT (
		GradeLevel
		, Url
		, IsCommunityPassportForm
	) VALUES (
		NewLinks.GradeLevel
		, NewLinks.Url
		, 1
	)
WHEN MATCHED THEN 
	UPDATE SET Url = NewLinks.Url
;