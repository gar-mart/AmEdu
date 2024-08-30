using FD.Base.Shared.Web.Models;

namespace Web.Areas.Framework.Models;

public class DownloadPdfViewModel: PdfViewModel<string>
{
    public DownloadPdfViewModel() { }
    public DownloadPdfViewModel(string data, PdfSection section) : base(data, section) { }

    /// <summary>
    /// The total number of copies of this PDF to print.
    /// </summary>
    /// <remarks>
    /// Defaults to <c>1</c>
    /// </remarks>
    public int Pages { get; set; } = 1;
}
