using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class ListEnrollmentsResponse: IResponse
{
    public ListEnrollmentsEnrollments Enrollments { get; set; }

    public class ListEnrollmentsEnrollments
    {
        public Enrollment[] Enrollment { get; set; }
    }
}
