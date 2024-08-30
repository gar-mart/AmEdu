using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class ListCoursesResponse: IResponse
{
    public ListCoursesCourses Courses { get; set; }

    public class ListCoursesCourses
    {
        public Course[] Course { get; set; }
    }
}
