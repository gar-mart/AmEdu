using System;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Staff.Announcements;

[TableMetaData("Staff", "Announcements", "Announcement")]
public class AnnouncementItem: IBaseModel
{
    private DateTime? _endDate;

    public int ClassId { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate
    {
        get => _endDate;
        // Buzz does a weird thing where if there is no end date, they return a date far in the future.
        // for all intents and purposes, we will use null to represent there being no end date.
        set => _endDate = value > DateTime.Now.AddYears(1000) ? null : value;
    }
}
