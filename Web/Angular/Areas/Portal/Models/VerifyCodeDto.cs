namespace Web.Areas.Portal.Models;

public class VerifyCodeDto
{
    public int UserId { get; set; }
    public string VerificationCode { get; set; }
    public bool CodeIsCorrect { get; set; }
}
