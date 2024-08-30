using Newtonsoft.Json.Serialization;

namespace Shared.Buzz;

public class LowerCasePropertyNameContractResolver: DefaultContractResolver
{
    protected override string ResolvePropertyName(string propertyName)
    {
        return propertyName.ToLower();
    }
}
