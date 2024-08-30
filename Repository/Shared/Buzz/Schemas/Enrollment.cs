using System;

namespace Shared.Buzz.Schemas;

public class Enrollment
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public string CourseId { get; set; }
    public string DomainId { get; set; }
    public string Reference { get; set; }
    public Guid Guid { get; set; }
    public string RoleId { get; set; }
    public RightsFlags Privileges { get; set; }
    public EnrollmentStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public EntityFlags Flags { get; set; }
    public DateTime FirstActivityDate { get; set; }
    public DateTime LastActivityDate { get; set; }
    public DateTime CreationDate { get; set; }
    public string CreationBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string ModifiedBy { get; set; }
    public string Version { get; set; }

    public BuzzUser User { get; set; }
    public EnrollmentMetrics EnrollmentMetrics { get; set; }
    public Course Course { get; set; }
}
