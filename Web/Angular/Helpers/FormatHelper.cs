using System;
using System.Collections.Generic;

namespace Api.Helpers;

public class FormatHelper
{
    public static string ToTimeFormat(decimal totalSeconds)
    {
        if (totalSeconds < 60)
        {
            return "-";
        }

        var timeSpan = TimeSpan.FromSeconds((double)totalSeconds);

        var parts = new List<string>();
        if (timeSpan.Days > 0)
        {
            parts.Add(timeSpan.Days + "d");
        }
        if (timeSpan.Hours > 0)
        {
            parts.Add(timeSpan.Hours + "h");
        }
        if (timeSpan.Minutes > 0)
        {
            parts.Add(timeSpan.Minutes + "m");
        }

        return string.Join(" ", parts);
    }
}
