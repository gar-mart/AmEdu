using System;

namespace Shared.Buzz.Responses;

public class GetStatusResponse: IResponse
{
    public GetStatus Status { get; set; }

    public class GetStatus
    {
        public int Rating { get; set; }
        public string RatingText { get; set; }
        public int SecondsSinceLastRatingChange { get; set; }
        public DateTime LastRatingChange { get; set; }
        public DateTime TestTime { get; set; }
        public string Version { get; set; }
        public GetStatusOverall Overall { get; set; }

        public class GetStatusOverall
        {
            public string Status { get; set; }
            public string Rating { get; set; }
            public string RatingText { get; set; }
            public string Sms { get; set; }
        }
    }
}
