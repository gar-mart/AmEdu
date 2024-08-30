using System;
using System.Linq;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Shared.Converters;

internal class JsonPathConverter: JsonConverter
{
    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        var jObject = JObject.Load(reader);
        var targetObject = Activator.CreateInstance(objectType);

        foreach (var prop in objectType.GetProperties().Where(p => p.CanRead && p.CanWrite))
        {
            var att = prop.GetCustomAttributes(true)
                .OfType<JsonPropertyAttribute>()
                .FirstOrDefault();

            var jsonPath = att?.PropertyName ?? prop.Name;
            var token = jObject.SelectToken(jsonPath);

            if (token != null && token.Type != JTokenType.Null)
            {
                object value;
                if (prop.PropertyType == typeof(bool) && token.Type == JTokenType.String)
                {
                    var tokenString = token.ToString();
                    // there are several truth values for meta-user-iep and meta-user-504
                    value = new string[] { "yes", "true", "504", "iep" }.Any(truthy => string.Equals(tokenString, truthy, StringComparison.InvariantCultureIgnoreCase));
                }
                else
                {
                    value = token.ToObject(prop.PropertyType, serializer);
                }
                prop.SetValue(targetObject, value, null);
            }
        }

        return targetObject;
    }

    public override bool CanConvert(Type objectType)
    {
        return false; // CanConvert is not called when [JsonConverter] attribute is used
    }

    public override bool CanWrite => false;
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}
