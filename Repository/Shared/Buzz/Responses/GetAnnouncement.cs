using System;

using Newtonsoft.Json;

namespace Shared.Buzz.Responses;

public class GetAnnouncementResponse
{
    public GetAnnouncementResponseAnnouncement Announcement { get; set; }

    public class GetAnnouncementResponseAnnouncement
    {
        public string Path { get; set; } // not from Buzz - added for us as a unique identifier
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Recurse { get; set; }
        public GetAnnouncementResponseAnnouncementBody Body { get; set; }

        public class GetAnnouncementResponseAnnouncementBody
        {
            [JsonProperty("$xml")]
            public string Value { get; set; }
        }
    }
}
