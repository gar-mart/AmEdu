namespace Repository.Repositories.Orientation;

public class EmailVerificationStepItem
{
    public string VerificationCode { get; set; }
    public bool CodeIsCorrect { get; set; }
}
