using System;

using Newtonsoft.Json;

namespace Shared.Converters;

public class StringToBooleanConverter: JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(string) || objectType == typeof(bool);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        return string.Equals("true", reader.Value?.ToString(), StringComparison.InvariantCultureIgnoreCase);
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}
