using FD.Base.Shared.Repository.Infrastructure.Database;

using Repository.Repositories.Staff.Announcements;

namespace Repository.Repositories.Student.Announcements;

[TableMetaData("Student", "Announcements", "Announcement")]
public class AnnouncementModel: AnnouncementItem
{
    public bool IsRead { get; set; }
}
