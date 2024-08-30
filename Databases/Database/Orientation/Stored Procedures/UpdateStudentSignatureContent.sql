CREATE PROCEDURE Orientation.UpdateStudentSignatureContent (
	@signatureContentId INT
	, @studentId INT
	, @signature NVARCHAR(MAX)
	, @signDate DATE
)
AS
SET NOCOUNT ON

;MERGE Orientation.StudentSignatureContent TRG USING (SELECT @studentId StudentId, @signatureContentId SignatureContentId) SRC ON
	TRG.SignatureContentId = SRC.SignatureContentId
	AND TRG.StudentId = SRC.StudentId
WHEN NOT MATCHED THEN INSERT (SignatureContentId, StudentId, Signature, SignDate) VALUES (
	@signatureContentId
	, @studentId
	, @signature
	, @signDate
)
WHEN MATCHED THEN UPDATE SET
	Signature = @signature
	, SignDate = @signDate;