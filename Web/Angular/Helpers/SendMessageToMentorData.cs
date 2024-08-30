using Repository.Repositories.Common.Student;

namespace Api.Helpers;

public class SendMessageToMentorData
{
    public StudentItem Student { get; set; }
    public string Message { get; set; }
    public bool IsSecondaryMentor { get; set; }
}
