namespace Repository.Infrastructure.Helpers;

public static class Constants
{
    public const string DateFormat = "MM-dd-yyyy";
    public const string DateWithoutYearFormat = "MM-dd";
    public const string TimeFormat = "hh:mm tt";
    public const string DateTimeFormat = DateFormat + " " + TimeFormat;
    public const string DateTimeWithoutYearFormat = DateWithoutYearFormat + " " + TimeFormat;

    public const int HoursInYear = 8760; // based on 365 day year
    public const int HoursInMonth = 720; // based on 30 day month
    public const int HoursInWeek = 168;
    public const int HoursInDay = 24;
}
