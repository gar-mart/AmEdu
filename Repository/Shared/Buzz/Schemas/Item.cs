using System;

using Newtonsoft.Json;

using Shared.Converters;

namespace Shared.Buzz.Schemas;

public class Item
{
    public string Id { get; set; }

    public ItemData Data { get; set; } = new ItemData();

    [JsonConverter(typeof(JsonPathConverter))]
    public class ItemData
    {
        [JsonProperty("parent.$value")]
        public string Parent { get; set; }
        [JsonProperty("type.$value")]
        public string Type { get; set; }
        [JsonProperty("title.$value")]
        public string Title { get; set; }
        [JsonProperty("duedate.$value")]
        public DateTime? DueDate { get; set; }
        [JsonProperty("duedategrace.$value")]
        public int DueDateGrace { get; set; }
        [JsonProperty("gradable.$value")]
        public bool Gradable { get; set; }
        [JsonProperty("visibility.$value")]
        public int? Visibility { get; set; }
    }
}
