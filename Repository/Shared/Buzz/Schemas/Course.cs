using System;

namespace Shared.Buzz.Schemas;

public class Course
{
    public enum CourseType
    {
        Continuous,
        Range
    }

    public string Id { get; set; }
    public string Title { get; set; }
    public string DomainId { get; set; }
    public string Reference { get; set; }
    public Guid Guid { get; set; }
    public int Schema { get; set; }
    public string BaseId { get; set; }
    public CourseType Type { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Days { get; set; }
    public string Term { get; set; }
    public EntityFlags Flags { get; set; }
    public DateTime CreationDate { get; set; }
    public string CreationBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string ModifiedBy { get; set; }
    public DateTime MainModifiedDate { get; set; }
    public string MainModifiedBy { get; set; }
    public string Version { get; set; }

    public CourseTeachers Teachers { get; set; }

    public class CourseTeachers
    {
        public CourseTeacher[] Teacher { get; set; }

        public class CourseTeacher
        {
            public string EnrollmentId { get; set; }
            public RightsFlags Privileges { get; set; }
            public string RoleId { get; set; }
            public string UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
        }
    }
}
