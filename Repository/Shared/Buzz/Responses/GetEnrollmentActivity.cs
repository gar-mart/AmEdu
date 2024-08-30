using System;

namespace Shared.Buzz.Responses;

public class GetEnrollmentActivityResponse: IResponse
{
    public GetEnrollmentActivityEnrollment Enrollment { get; set; }

    public class GetEnrollmentActivityEnrollment
    {
        public GetEnrollmentActivityEnrollmentActivity[] Activity { get; set; }

        public class GetEnrollmentActivityEnrollmentActivity
        {
            public string EnrollmentId { get; set; }
            public string ItemId { get; set; }
            public DateTime Date { get; set; }
            public int Seconds { get; set; }
            public string Title { get; set; }
        }
    }
}
