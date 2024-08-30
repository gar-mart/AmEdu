using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Attendance.Communications;

[TableMetaData("Attendance", "Communications", "Communication")]
public class CommunicationItem: IBaseModel
{
    [FdIgnore(onInsert: false)]
    public int UserId { get; set; }
    [FdIgnore(onInsert: false)]
    public int StaffId { get; set; }
    public DateTime Date { get; set; }
    public CommunicationType Type { get; set; }
    public string Notes { get; set; }
    public bool WasSuccessful { get; set; }
    public bool AwardPoint { get; set; }
}

public enum CommunicationType
{
    Phone = 1,
    Email = 2,
    Text = 3,
    GoogleChat = 4,
    Tutoring = 5,
    SSW = 6,
    IEPServiceTime = 7,
    GoogleMeet = 8,
    InPerson = 9
}
