using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

using Newtonsoft.Json;

namespace Shared.Buzz;

public static class Extensions
{
    public static async Task<T> ToModel<T>(this HttpResponseMessage response) where T : IResponse
    {
        var model = await response.ToModel(typeof(BuzzResponse<T>)) as BuzzResponse<T>;
        return model?.Response; // exclude the wrapper object
    }

    public static async Task<object> ToModel(this HttpResponseMessage response, Type type)
    {
        var content = await response.EnsureSuccessStatusCode()
            .Content
            .ReadAsStringAsync();

        var model = JsonConvert.DeserializeObject(content, type);

        return model;
    }

    public static HttpContent ToHttpContent<T>(this T request)
    {
        var json = request == null ? string.Empty : JsonConvert.SerializeObject(request, new JsonSerializerSettings { ContractResolver = new LowerCasePropertyNameContractResolver() });
        return new StringContent(json, Encoding.UTF8, "application/json");
    }

    public static string ToQueryString<T>(this T self, bool prependQuestionMark = true, bool prependAmpersand = false)
    {
        if (self == null)
        {
            return string.Empty;
        }

        var queryBuilder = HttpUtility.ParseQueryString(string.Empty);
        var queries = new List<string>();

        foreach (var propertyInfo in self.GetType().GetProperties())
        {
            var value = propertyInfo.GetValue(self);

            if (value != null)
            {
                if (value.GetType().IsSimpleType())
                {
                    queryBuilder[propertyInfo.Name] = value.ToString();
                }
                else
                {
                    var innerQuery = value.ToQueryString(false);
                    if (!string.IsNullOrEmpty(innerQuery))
                    {
                        queries.Add(value.ToQueryString());
                    }
                }
            }
        }

        var thisQuery = queryBuilder.ToString();
        var innerQueries = string.Join('&', queries);

        var query = string.Empty;
        if (!string.IsNullOrEmpty(thisQuery) || !string.IsNullOrEmpty(innerQueries))
        {
            if (prependQuestionMark)
            {
                query = "?";
            }
            else if (prependAmpersand)
            {
                query = "&";
            }
        }

        if (!string.IsNullOrEmpty(thisQuery))
        {
            query += thisQuery;

            if (!string.IsNullOrEmpty(innerQueries))
            {
                query += $"&{innerQueries}";
            }
        }
        else if (!string.IsNullOrEmpty(innerQueries))
        {
            query += innerQueries;
        }

        return query;
    }

    public static bool IsSimpleType(this Type type)
    {
        return
            type.IsPrimitive
            || new Type[]
                {
                    typeof(string),
                    typeof(decimal),
                    typeof(DateTime),
                    typeof(DateTimeOffset),
                    typeof(TimeSpan),
                    typeof(Guid)
                }.Contains(type)
            || type.IsEnum
            || Convert.GetTypeCode(type) != TypeCode.Object
            || type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>) && IsSimpleType(type.GetGenericArguments()[0]);
    }
}
