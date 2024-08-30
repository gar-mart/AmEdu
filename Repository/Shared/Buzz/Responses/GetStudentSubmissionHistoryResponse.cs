using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class GetStudentSubmissionHistoryResponse: IResponse
{
    public GetStudentSubmissionHistoryResponseSubmissions Submissions { get; set; }

    public class GetStudentSubmissionHistoryResponseSubmissions
    {
        public Submission[] Submission { get; set; }
    }
}
