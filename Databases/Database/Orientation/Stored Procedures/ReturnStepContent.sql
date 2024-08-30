CREATE PROCEDURE Orientation.ReturnStepContent (
	@stepId INT
)
AS
SET NOCOUNT ON

-- YouTubeVideoContent
SELECT 
	YouTubeVideoContent.Id
	, YouTubeVideoContent.StepId
	, YouTubeVideoContent.OrderBy
	, YouTubeVideoContent.VideoId
FROM Orientation.YouTubeVideoContent
WHERE StepId = @stepId

-- ShortcutsContent
SELECT 
	AppTileMetadataContent.Id
	, AppTileMetadataContent.StepId
	, AppTileMetadataContent.OrderBy
	, AppTileMetadataContent.AppTileMetadataId
FROM Orientation.AppTileMetadataContent
WHERE StepId = @stepId

-- ResourcesContent
SELECT 
	StudentResourceContent.Id
	, StudentResourceContent.StepId
	, StudentResourceContent.OrderBy
	, StudentResourceContent.StudentResourceId
FROM Orientation.StudentResourceContent
WHERE StepId = @stepId

-- ContactContent
SELECT 
	ContactContent.Id
	, ContactContent.StepId
	, ContactContent.OrderBy
	, ContactContent.UserId
FROM Orientation.ContactContent
WHERE StepId = @stepId

-- TextImageContent
SELECT
	TextImageContent.Id
	, TextImageContent.StepId
	, TextImageContent.OrderBy
	, TextImageContent.Content
FROM Orientation.TextImageContent
WHERE StepId = @stepId

-- SignatureContent
SELECT 
	SignatureContent.Id
	, SignatureContent.StepId
	, SignatureContent.OrderBy
	, SignatureContent.Signer
	, SignatureContent.Disclaimer
FROM Orientation.SignatureContent
WHERE StepId = @stepId

-- SystemContent
SELECT
	SystemContent.Id
	, SystemContent.StepId
	, SystemContent.OrderBy
	, SystemContent.ComponentId
FROM Orientation.SystemContent
WHERE StepId = @stepId

-- QuizContent 
SELECT 
	QuizContent.Id
	, QuizContent.OrderBy
	, QuizContent.StepId
FROM Orientation.QuizContent
WHERE StepId = @stepId