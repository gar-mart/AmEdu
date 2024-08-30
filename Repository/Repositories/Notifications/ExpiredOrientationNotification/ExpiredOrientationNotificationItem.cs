
using System.Collections.Generic;

using Repository.Repositories.Common.Staff;
using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Notifications.ExpiredOrientationNotification;

public class ExpiredOrientationNotificationItem
{
    public List<StudentItem> StudentList;
    public List<StaffItem> MentorList;
}
