using System;
using System.Collections.Generic;
using System.Linq;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Shared.Helpers;

public static class OpenXmlUtility
{
    //// https://msdn.microsoft.com/en-GB/library/documentformat.openxml.spreadsheet.numberingformat(v=office.14).aspx
    private static Dictionary<uint, string> DateFormatDictionary { get; } = new Dictionary<uint, string>()
    {
        [14] = "dd/MM/yyyy",
        [15] = "d-MMM-yy",
        [16] = "d-MMM",
        [17] = "MMM-yy",
        [18] = "h:mm AM/PM",
        [19] = "h:mm:ss AM/PM",
        [20] = "h:mm",
        [21] = "h:mm:ss",
        [22] = "M/d/yy h:mm",
        [30] = "M/d/yy",
        [34] = "yyyy-MM-dd",
        [45] = "mm:ss",
        [46] = "[h]:mm:ss",
        [47] = "mmss.0",
        [51] = "MM-dd",
        [52] = "yyyy-MM-dd",
        [53] = "yyyy-MM-dd",
        [55] = "yyyy-MM-dd",
        [56] = "yyyy-MM-dd",
        [58] = "MM-dd",
        [165] = "M/d/yy",
        [166] = "dd MMMM yyyy",
        [167] = "dd/MM/yyyy",
        [168] = "dd/MM/yy",
        [169] = "d.M.yy",
        [170] = "yyyy-MM-dd",
        [171] = "dd MMMM yyyy",
        [172] = "d MMMM yyyy",
        [173] = "M/d",
        [174] = "M/d/yy",
        [175] = "MM/dd/yy",
        [176] = "d-MMM",
        [177] = "d-MMM-yy",
        [178] = "dd-MMM-yy",
        [179] = "MMM-yy",
        [180] = "MMMM-yy",
        [181] = "MMMM d, yyyy",
        [182] = "M/d/yy hh:mm t",
        [183] = "M/d/y HH:mm",
        [184] = "MMM",
        [185] = "MMM-dd",
        [186] = "M/d/yyyy",
        [187] = "d-MMM-yyyy"
    };

    public static string GetText(this WorkbookPart workbookPart, Cell cell)
    {
        var header = cell?.CellValue?.Text;

        if (cell?.DataType != null && cell.DataType == CellValues.SharedString)
        {
            // strings are always(?) stored in a SharedString table
            var sharedStringTable = workbookPart.GetPartsOfType<SharedStringTablePart>().First().SharedStringTable;
            header = sharedStringTable.ChildElements[int.Parse(header)].InnerText;
        }
        else if (cell?.DataType == null && cell?.StyleIndex != null)
        {
            // to indicate a Date type value, we have to check the cell formatting.
            var cellFormat = workbookPart.WorkbookStylesPart.Stylesheet.CellFormats.ChildElements[int.Parse(cell.StyleIndex)] as CellFormat;
            if (DateFormatDictionary.TryGetValue(cellFormat?.NumberFormatId ?? default, out _))
            {
                // note: we could convert the DateTime to the original date format by using the value from DateFormatDictionary,
                //       but for our case we don't care about the original formatting
                header = double.TryParse(header, out var dateTime) ? DateTime.FromOADate(dateTime).ToString() : header;
            }
        }

        return header;
    }
}
