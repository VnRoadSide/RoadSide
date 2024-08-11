using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RoadSide.Domain;

public class AdditionalPropertiesConverter : JsonConverter<Dictionary<string, object>>
{
    public override Dictionary<string, object> ReadJson(JsonReader reader, Type objectType, Dictionary<string, object> existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        var dictionary = new Dictionary<string, object>();

        var jObject = JObject.Load(reader);
        foreach (var property in jObject.Properties())
        {
            dictionary.Add(property.Name, ConvertJTokenToObject(property.Value, serializer));
        }

        return dictionary;
    }

    public override void WriteJson(JsonWriter writer, Dictionary<string, object> value, JsonSerializer serializer)
    {
        // Start writing the JSON object
        writer.WriteStartObject();

        foreach (var kvp in value)
        {
            // Write each key-value pair in the dictionary as a JSON property
            writer.WritePropertyName(kvp.Key);
            serializer.Serialize(writer, kvp.Value);
        }

        // End writing the JSON object
        writer.WriteEndObject();
    }
    
    private object ConvertJTokenToObject(JToken token, JsonSerializer serializer)
    {
        switch (token.Type)
        {
            case JTokenType.Object:
                return token.ToObject<object>(serializer);
            case JTokenType.Array:
                var list = new List<object>();
                foreach (var item in token)
                {
                    list.Add(ConvertJTokenToObject(item, serializer));
                }
                return list;
            default:
                return token.ToObject<object>(serializer);
        }
    }
}