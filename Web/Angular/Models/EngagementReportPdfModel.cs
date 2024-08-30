using System;
using System.Collections.Generic;

using Repository.Repositories.Attendance.ClassUsers;
using Repository.Repositories.Staff.EngagementReport;

namespace Api.Models;

public class EngagementReportPdfModel
{
    public EngagementReportItem EngagementReportItem { get; set; }

    public IEnumerable<ClassUserModel> ClassUserModels { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
