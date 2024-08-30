using System;
using System.ComponentModel;
using System.Globalization;

using Newtonsoft.Json;


namespace Shared.Helpers;

/// <summary>
/// Struct to alias the <see cref="int" /> type to provide clarity on school year.
/// New school years start on July 1. This struct represent the calendar year that a school year starts.
/// For example: The value <c>2021</c> represents the school year 2021-2022.
/// </summary>
[TypeConverter(typeof(SchoolYearTypeConverter)), JsonConverter(typeof(SchoolYearJsonConverter))]
public struct SchoolYear
{
    public int value;

    public DateTime Start => new(value, 7, 1);
    public DateTime End => Start.AddYears(1).AddTicks(-1);

    public static SchoolYear Current => new(DateTime.Now);

    public SchoolYear(int schoolYear)
    {
        if (schoolYear == 0)
        {
            schoolYear = Current.value;
        }
        value = schoolYear;
    }

    /// <summary>
    /// Gets the school year for a given date.
    /// If the date's month is July or later, then the date's year is used.
    /// Otherwise, the date's year minus one will be used.
    /// </summary>
    /// <param name="date">The date to get the school year for.</param>
    public SchoolYear(DateTime date)
    {
        value = date.Month >= 7 ? date.Year : date.Year - 1;
    }

    public static implicit operator SchoolYear(int schoolYear)
    {
        if (schoolYear == 0)
        {
            return Current;
        }

        return new SchoolYear { value = schoolYear };
    }

    public static implicit operator int(SchoolYear self)
    {
        if (self.value == 0)
        {
            return Current.value;
        }

        return self.value;
    }

    public static implicit operator SchoolYear(DateTime schoolYear) => new(schoolYear);
}

public class SchoolYearTypeConverter: TypeConverter
{
    public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
    {
        return sourceType == typeof(string) || sourceType == typeof(int) || sourceType == typeof(DateTime) || base.CanConvertFrom(context, sourceType);
    }

    public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
    {
        if (value is string stringValue)
        {
            if (int.TryParse(stringValue, out var intValue))
            {
                value = intValue;
            }
            else if (DateTime.TryParse(stringValue, out var dateTimeValue))
            {
                value = dateTimeValue;
            }
        }

        return value is int schoolYear ? new SchoolYear(schoolYear)
             : value is DateTime dateTime ? new SchoolYear(dateTime)
             : base.ConvertFrom(context, culture, value);
    }
}

public class SchoolYearJsonConverter: JsonConverter<SchoolYear>
{
    public override SchoolYear ReadJson(JsonReader reader, Type objectType, SchoolYear existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        var value = reader.Value?.ToString();

        if (int.TryParse(value, out var intStringValue))
        {
            return intStringValue;
        }
        else if (DateTime.TryParse(value, out var dateStringValue))
        {
            return dateStringValue;
        }

        throw new ArgumentException(reader.Value?.ToString());
    }

    public override void WriteJson(JsonWriter writer, SchoolYear schoolYear, JsonSerializer serializer)
    {
        writer.WriteValue(schoolYear.value);
    }
}
