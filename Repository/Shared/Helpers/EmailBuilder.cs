using System.Collections.Generic;
using System.Linq;
using System.Text;

using Repository.Infrastructure;

namespace Shared.Helpers;

public static class EmailBuilder
{
    private const string _fontFamily = "font-family:'Verdana','Arial',sans-serif;";

    /// <summary>
    /// Build a table. If number of headers and number of cells in the first row don't match, returns an empty string.
    /// </summary>
    /// <param name="headers"></param>
    /// <param name="rowData"></param>
    /// <returns></returns>
    public static string BuildTableHtml(List<string> headers = null, List<List<string>> rowData = null)
    {
        headers ??= new List<string>();
        rowData ??= new List<List<string>>();

        if (rowData.Any() && headers.Any() && rowData[0].Count != headers.Count)
        {
            return "";
        }

        var sb = new StringBuilder("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate; mso-table-lspace:0pt; mso-table-rspace:0pt; box-sizing:border-box; width: 100%;\">");
        if (headers.Any())
        {
            _ = sb.Append("<thead><tr>");
            foreach (var header in headers)
            {
                _ = sb.AppendFormat("<th style=\"{1}font-size:14px;\">{0}</th>", header, _fontFamily);
            }
            _ = sb.Append("</tr></thead>");
        }
        if (rowData.Any())
        {
            _ = sb.Append("<tbody>");
            foreach (var row in rowData)
            {
                _ = sb.Append("<tr>");
                foreach (var col in row)
                {
                    _ = sb.AppendFormat("<td style=\"{1}font-size:14px;\">{0}</td>", col, _fontFamily);
                }
                _ = sb.Append("</tr>");
            }
            _ = sb.Append("</tbody>");
        }
        _ = sb.Append("</table>");

        return sb.ToString();
    }


    public static string BuildTableHtml(List<TableCellItem> headers = null, List<List<TableCellItem>> rowData = null, int border = 1, int cellpadding = 0, int cellspacing = 0, bool fullWidth = true, int Width = 0)
    {
        headers ??= new List<TableCellItem>();
        rowData ??= new List<List<TableCellItem>>();

        var sb = new StringBuilder()
            .AppendFormat("<table cellpadding=\"{0}\" cellspacing=\"{1}\" style=\"border-collapse:separate; mso-table-lspace:0pt; mso-table-rspace:0pt; box-sizing:border-box; {2}\">"
                , cellpadding
                , cellspacing
                , fullWidth ? "width: 100%;" : (Width > 0) ? "width:" + Width + "px;" : "");

        var borderBottom = (border > 0) ? $"border-bottom:{border}px solid #dddddd;" : "";

        if (headers.Count > 0)
        {
            _ = sb.Append("<thead><tr>");
            foreach (var header in headers)
            {
                _ = sb.AppendFormat("<th style=\"{1}font-size:14px;text-align:{2};white-space:{3};width:{4};{7}\" colspan='{5}' rowspan='{6}'>{0}</th>"
                    , header.Text
                    , _fontFamily
                    , header.TextAlign
                    , header.WhiteSpace
                    , (header.Width > 0) ? header.Width + (header.WidthAsPercentage ? "%" : "px") : "auto"
                    , header.ColSpan
                    , header.RowSpan
                    , borderBottom);
            }

            _ = sb.Append("</tr></thead>");
        }

        if (rowData.Count > 0)
        {
            _ = sb.Append("<tbody>");

            foreach (var row in rowData)
            {
                _ = sb.Append("<tr>");
                foreach (var col in row)
                {
                    _ = sb.AppendFormat("<td style=\"{1}font-size:14px;vertical-align:top;text-align:{2};white-space:{3};{4}{5}{6}{9}\" colspan='{7}' rowspan='{8}'>{0}</td>"
                        , col.Text
                        , _fontFamily
                        , col.TextAlign
                        , col.WhiteSpace
                        , (col.Width > 0) ? "width:" + col.Width + (col.WidthAsPercentage ? "%;" : "px;") : ""
                        , (!string.IsNullOrEmpty(col.BackgroundColor)) ? "background-color:" + col.BackgroundColor + ";" : ""
                        , (!string.IsNullOrEmpty(col.TextColor)) ? "color:" + col.TextColor + ";" : ""
                        , col.ColSpan
                        , col.RowSpan
                        , borderBottom);
                }
                _ = sb.Append("</tr>");
            }

            _ = sb.Append("</tbody>");
        }

        _ = sb.Append("</table>");

        return sb.ToString();
    }


    /// <summary>
    /// Create a paragraph element with the provided text
    /// </summary>
    public static string BuildParagraph(string text, bool applyTopMargin = false, bool applyBold = false, bool applyMuted = false)
    {
        return string.Format("<p style=\"{1}font-size:14px;font-weight:{3};margin:0;margin-bottom:15px;{2}{4}\" >{0}</p>",
            text,
            _fontFamily,
            applyTopMargin ? "margin-top: 15px;" : string.Empty,
            applyBold ? "bold" : "normal",
            applyMuted ? "color: gray;" : string.Empty);
    }


    public static string BuildSpacing(int lineSpacing = 1)
    {
        return string.Join(null, Enumerable.Range(1, lineSpacing).Select(_ => "<br/>"));
    }


    /// <summary>
    /// Create a header element with an optional bottom border
    /// </summary>
    public static string BuildHeader(string text, bool hasBottomBorder = false, bool applyBottomMargin = true)
    {
        return string.Format("<h3 style=\"{1}font-size:18px;font-weight:normal;margin:0;margin-bottom:{3};width:100%;{2}\">{0}</h3>",
            text,
            _fontFamily,
            hasBottomBorder ? "border-bottom:1px solid #A0A0A0;" : string.Empty,
            applyBottomMargin ? "10px" : "0");
    }


    /// <summary>
    /// Build a list of items
    /// </summary>
    /// <param name="listItems"></param>
    /// <returns></returns>
    public static string BuildList(List<string> listItems)
    {
        var list = new StringBuilder();
        _ = list.Append("<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" style=\"border-collapse:separate; mso-table-lspace:0pt; mso-table-rspace:0pt; box-sizing:border-box; width: 100%;\"><tbody><tr><td>&nbsp;</td></tr>");
        foreach (var item in listItems)
        {
            _ = list.Append("<tr>");
            _ = list.AppendFormat("<td style=\"{1}font-size:14px;border-bottom:2px solid #E6ECED;\">{0}</td>", item, _fontFamily);
            _ = list.Append("</tr>");
        }
        _ = list.Append("</tbody></table>");

        return list.ToString();
    }

    /// <summary>
    /// Build the email, inserting provided text where appropriate
    /// </summary>
    /// <param name="appConfigurations">App configurations.</param>
    /// <param name="preheader">The "preview" text seen in most email viewers. Shouldn't actually be visible</param>
    /// <param name="header">Top level header</param>
    /// <param name="body">Body text. In most cases, all of the text inserted here should have been built using the helper methods provided.</param>
    /// <param name="width">Width of the email.</param>
    /// <returns></returns>
    public static string BuildEmail(AppConfigurations appConfigurations, string preheader, string header, string body, int width = 920)
    {
        header = string.IsNullOrEmpty(header) ? "" : BuildHeader(header);

        var preHeader = string.IsNullOrEmpty(preheader) ? "" : preheader;
        var maxWidth = width + 40;

        // todo: move the email template to it's own file and build it with MJML pattern
        return @$"
                <!-- Based on code created by leemunroe at https://github.com/leemunroe/responsive-html-email-template -->
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name=""viewport"" content=""width=device-width"">
                    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"">
                    <title>AmEdu Orientation Notification</title>
                    <style type=""text/css"">
                        /* -------------------------------------
                            INLINED WITH https://putsmail.com/inliner
                        ------------------------------------- */
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: {maxWidth}px) {"{"}
                            table[class=body] h1 {"{"}
                                font-size: 28px !important;
                                margin-bottom: 10px !important;
                            {"}"}

                            table[class=body] p,
                            table[class=body] ul,
                            table[class=body] ol,
                            table[class=body] td,
                            table[class=body] span,
                            table[class=body] a {"{"}
                                font-size: 16px !important;
                            {"}"}

                            table[class=body] .wrapper,
                            table[class=body] .article {"{"}
                                padding: 10px !important;
                            {"}"}

                            table[class=body] .content {"{"}
                                padding: 0 !important;
                            {"}"}

                            table[class=body] .container {"{"}
                                padding: 0 !important;
                                width: 100% !important;
                            {"}"}

                            table[class=body] .main {"{"}
                                border-left-width: 0 !important;
                                border-radius: 0 !important;
                                border-right-width: 0 !important;
                            {"}"}

                            table[class=body] .btn table {"{"}
                                width: 100% !important;
                            {"}"}

                            table[class=body] .btn a {"{"}
                                width: 100% !important;
                            {"}"}

                            table[class=body] .img-responsive {"{"}
                                height: auto !important;
                                max-width: 100% !important;
                                width: auto !important;
                            {"}"}
                        {"}"}
                        /* -------------------------------------
                            PRESERVE THESE STYLES IN THE HEAD
                        ------------------------------------- */
                        @media all {"{"}
                            .ExternalClass {"{"}
                                width: 100%;
                            {"}"}

                                .ExternalClass,
                                .ExternalClass p,
                                .ExternalClass span,
                                .ExternalClass font,
                                .ExternalClass td,
                                .ExternalClass div {"{"}
                                    line-height: 100%;
                                {"}"}

                            .apple-link a {"{"}
                                color: inherit !important;
                                font-family: inherit !important;
                                font-size: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                                text-decoration: none !important;
                            {"}"}

                            .btn-primary table td:hover {"{"}
                                background-color: #34495e !important;
                            {"}"}

                            .btn-primary a:hover {"{"}
                                background-color: #34495e !important;
                                border-color: #34495e !important;
                            {"}"}

                            body {"{"}
                                font-family: 'Verdana','Arial',sans-serif;
                                color: #384449;
                            {"}"}
                    </style>
                </head>
                <body class="""" style=""background-color:#f6f6f6;font-family:'Verdana','Arial',sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;"">
                    <table border=""0"" cellpadding=""0"" cellspacing=""0"" class=""body"" style=""border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;"">
                        <tr>
                            <td style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;"">&nbsp;</td>
                            <td class=""container"" style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;display:block;max-width:{width}px;padding:10px;width:{width}px;Margin:0 auto !important;"">
                                <div class=""content"" style=""box-sizing:border-box;display:block;Margin:0 auto;max-width:{width}px;padding:10px;"">
                                    <!-- START CENTERED WHITE CONTAINER -->
                                    <span class=""preheader"" style=""color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;"">{preHeader}</span>
                                    <table class=""main"" style=""border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;"">
                                        <!-- START MAIN CONTENT AREA -->
                                        <tr>
                                            <td class=""wrapper"" style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;"">
                                                <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"">
                                                    <tr>
                                                        <td style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;"">
                                                            <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:120px;padding-bottom:50px;"">
                                                                <tr>
                                                                    <td>
                                                                        <img src=""https://portal.AmEduglobal.org/assets/AmEdu-logo-color.png"" width=""100%"" alt=""AmEdu Global"" />
                                                                    </td>
                                                                </tr>
                                                            </table>

                                                            {header}
                                                            {body}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- END MAIN CONTENT AREA -->
                                    </table>
                                    <!-- START FOOTER -->
                                    <div class=""footer"" style=""clear:both;padding-top:10px;text-align:center;width:100%;"">
                                        <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;"">
                                            <tr><td>&nbsp;</td></tr>
                                            <tr>
                                                <td class=""content-block"" style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;"">
                                                    <span class=""apple-link"" style=""color:#999999;font-size:12px;text-align:center;"">This is an automated <a href=""{appConfigurations.PortalUrl}"" style=""color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;"">AmEdu Portal</a> email. Please do not reply.</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END FOOTER -->
                                    <!-- END CENTERED WHITE CONTAINER -->
                                </div>
                            </td>
                            <td style=""font-family:'Verdana','Arial',sans-serif;font-size:14px;vertical-align:top;"">&nbsp;</td>
                        </tr>
                    </table>
                </body>
                </html>
            ";
    }
}

public class TableCellItem
{
    public string Text { get; protected set; }
    public TextAlignType TextAlign { get; protected set; } = TextAlignType.left;
    public WhiteSpaceType WhiteSpace { get; protected set; } = WhiteSpaceType.normal;
    public int ColSpan { get; protected set; } = 1;
    public int RowSpan { get; protected set; } = 1;
    public int Width { get; protected set; }
    public bool WidthAsPercentage { get; protected set; }
    public string BackgroundColor { get; protected set; }
    public string TextColor { get; protected set; }


    public TableCellItem() { }
    public TableCellItem(object text, int width = 0, int colSpan = 1, int rowSpan = 1, string textColor = "", string backgroundColor = "", WhiteSpaceType whiteSpace = WhiteSpaceType.normal, TextAlignType textAlign = TextAlignType.left, bool widthAsPercentage = false)
        : this(text?.ToString(), width, colSpan, rowSpan, textColor, backgroundColor, whiteSpace, textAlign, widthAsPercentage) { }
    public TableCellItem(string text, int width = 0, int colSpan = 1, int rowSpan = 1, string textColor = "", string backgroundColor = "", WhiteSpaceType whiteSpace = WhiteSpaceType.normal, TextAlignType textAlign = TextAlignType.left, bool widthAsPercentage = false)
    {
        Text = text;
        Width = width;
        ColSpan = colSpan;
        RowSpan = rowSpan;
        TextColor = textColor;
        BackgroundColor = backgroundColor;
        WhiteSpace = whiteSpace;
        TextAlign = textAlign;
        WidthAsPercentage = widthAsPercentage;
    }
}

public enum TextAlignType
{
    left,
    center,
    right
}

public enum WhiteSpaceType
{
    normal,
    nowrap,
    pre
}
