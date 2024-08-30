CREATE PROCEDURE Orientation.Step_EmailVerification_VerifyCode(
	@userId INT
	, @verificationCode CHAR(6)
	, @codeIsCorrect BIT OUTPUT
)
AS
SET NOCOUNT ON

set @codeIsCorrect = 0

IF (SELECT VerificationCode FROM Orientation.Step_EmailVerification WHERE UserId = @userId) = @verificationCode BEGIN
	
	SET @codeIsCorrect = 1
	
	UPDATE Orientation.Step_EmailVerification
	SET IsVerified = 1
	WHERE UserId = @userId

END

