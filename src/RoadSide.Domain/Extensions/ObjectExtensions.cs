using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RoadSide.Domain;

public static class ObjectExtensions
{
    public static Dictionary<string, object> ToDictionary(this object obj)
    {
        // Initialize the serializer and add the converter
        var serializer = new JsonSerializer();
        serializer.Converters.Add(new AdditionalPropertiesConverter());

        // Serialize the object into a JToken
        var token = JToken.FromObject(obj, serializer);

        // Convert the JToken into a Dictionary<string, object>
        var dictionary = token.ToObject<Dictionary<string, object>>(serializer);

        return dictionary;
    }
}