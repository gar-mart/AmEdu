using System;

namespace Shared.Buzz.Responses;

public class GetAnnouncementListResponse: IResponse
{
    public GetAnnouncementListAnnouncements Announcements { get; set; }

    public class GetAnnouncementListAnnouncements
    {
        public GetAnnouncementListAnnouncementsAnnouncement[] Announcement { get; set; }

        public class GetAnnouncementListAnnouncementsAnnouncement
        {
            public string Path { get; set; }
            public string Id { get; set; }
            public string Title { get; set; }
            public string Version { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public bool Recurse { get; set; }
            public bool HasUrl { get; set; }
            public DateTime CreationDate { get; set; }
            public DateTime ModifiedDate { get; set; }
        }
    }
}
