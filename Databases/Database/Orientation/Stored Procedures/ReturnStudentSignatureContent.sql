CREATE PROCEDURE Orientation.ReturnStudentSignatureContent (
	@studentId INT
	, @signatureContentId INT
)
AS
SET NOCOUNT ON
	
SELECT 
	StudentSignatureContent.Signature
	, StudentSignatureContent.SignatureContentId
	, StudentSignatureContent.SignDate
	, StudentSignatureContent.StudentId
FROM Orientation.StudentSignatureContent
WHERE StudentId = @studentId
	AND SignatureContentId = @signatureContentId  
