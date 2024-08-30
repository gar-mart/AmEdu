CREATE PROCEDURE Orientation.Step_EmailVerification_ReturnCode(
	@userId INT
	, @verificationCode CHAR(6) OUTPUT
)
AS
SET NOCOUNT ON

SET @verificationCode = 100000 + ABS(CHECKSUM(NEWId())) % 900000

MERGE Orientation.Step_EmailVerification TRG
USING (SELECT @userId UserId) SRC ON TRG.UserId = SRC.UserId
WHEN MATCHED THEN UPDATE SET VerificationCode = @verificationCode
WHEN NOT MATCHED THEN INSERT(UserId, VerificationCode) VALUES(@userId, @verificationCode);

