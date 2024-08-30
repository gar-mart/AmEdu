using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using ClosedXML.Excel;

using CsvHelper;

using FD.Base.Shared.Web.Filters;
using FD.Base.Shared.Web.Models;
using FD.Base.Shared.Web.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

using Repository.Repositories.Framework.DateTime;
using Repository.Repositories.Framework.Random;

using Shared.Helpers;

using Web.Areas.Framework.Models;

namespace Web.Areas.Framework.Controllers;

/// <summary>
/// This controller is used in conjuction with the Developer Framework Pages.
/// </summary>
[Area("Framework")]
[Route("api/[area]/[controller]/[action]")]
[Authorize] // this isn't a typical controller with Get, Post, Put, Delete actions so enforce the action name.
[ApiExplorerSettings(IgnoreApi = true)]
public sealed class FrameworkController: ApiController
{
    private readonly IViewRenderService _viewRenderService;
    private readonly DateTimeRepository _dateTimeRepository;
    private readonly RandomRepository _randomRepository;
    private static readonly string[] _people = new string[]
    {
        "Mikael Ortega",
        "Aurora Solomon",
        "Ciara Love",
        "Clayton Macfarlane",
        "Simra Edwards",
        "Mandeep Redman",
        "Ariyan Michael",
        "Katey Kane",
        "Catherine Mcknight",
        "Kaisha Begum",
        "Daanish Roach",
        "Siobhan Kelley",
        "Blade Firth",
        "Jackson Mccray",
        "Maia Cannon",
        "Siena Carney",
        "Acacia Mcneil",
        "Jessica Watts",
        "Derren Nguyen",
        "Kaylie Orr",
        "Ellouise Sosa",
        "Aliya Vo",
        "Farhaan Patton",
        "Cecelia Dudley",
        "Dante Knott",
        "Byron Greaves",
        "Jolie Carr",
        "Rania Hutchings",
        "Alaina Juarez",
        "Corinne Weston",
        "Kaleb Chen",
        "Greta Bray",
        "Delia Neal",
        "Lorelei Harper",
        "Johnny Mooney",
        "Mikail Frank",
        "Rudy Carrillo",
        "Malika Bate",
        "Phyllis Millar",
        "Rachael Carroll",
        "Bailey Flowers",
        "Dale Wiggins",
        "Saskia Rooney",
        "Essa Sloan",
        "Dilara Mcdonnell",
        "Leyton Gallegos",
        "Ahmet Moon",
        "Phoebe Woolley",
        "Bridie Palmer",
        "Leia Lord",
        "Cordelia Stacey",
        "Isobelle Holloway",
        "Mason Mccormack",
        "Mahi Bailey",
        "Atlanta Knowles",
        "Martin Ponce",
        "Pola Blair",
        "Lola Rees",
        "Ema Downs",
        "Rogan Cline",
        "Layan Mcphee",
        "Helin Greenaway",
        "Fletcher Crawford",
        "Charles Schmidt",
        "Duke Shepard",
        "Alexis Yu",
        "Lucy Mcgowan",
        "Seb Bob",
        "Samantha Morse",
        "Ella - Rose Rigby",
        "Sohail O'Brien",
        "Wanda Monroe",
        "Aria Santiago",
        "Hussain Rossi",
        "Denis Hull",
        "Hughie Ray",
        "Larry Gilmour",
        "Belinda Woodard",
        "Cristian Mcmillan",
        "Reid Lopez",
        "Shaunna Cantu",
        "Zak Vega",
        "Paris Armstrong",
        "Serenity Rodriguez",
        "Sabiha Pham",
        "Adrienne Battle",
        "Sohaib Keeling",
        "Willie Luna",
        "Joe Bassett",
        "Shaurya Dunn",
        "Faizaan Jennings",
        "Mary Barron",
        "Faye O'Doherty",
        "Lani Clay",
        "Anne Valencia",
        "Malaikah Pickett",
        "Tammy Brennan",
        "Campbell Kim",
        "Ffion Cruz",
        "Oisin Galvan"
    };

    public FrameworkController(
        IViewRenderService viewRenderService,
        DateTimeRepository dateTimeRepository,
        RandomRepository randomRepository
    )
    {
        _viewRenderService = viewRenderService;
        _dateTimeRepository = dateTimeRepository;
        _randomRepository = randomRepository;
    }

    [HttpPost]
    public IActionResult SendEmail(string emailAddress, string toName, string subject, string sendFrom)
    {
        throw new NotImplementedException(nameof(SendEmail));

        // undone: not implemented
        //// don't allow user to send framework emails to just anyone.
        //if (emailAddress?.EndsWith("@freedomdev.com", StringComparison.InvariantCultureIgnoreCase) != true)
        //{
        //    return BadRequest($"{emailAddress} is not supported. Please use an @freedomdev.com domain.");
        //}

        //var html = await _viewRenderService.RenderToStringAsync("FrameworkEmail", new WebBaseEmailViewModel(toName));

        //// also send email address in cc and bcc for testing
        //await _emailSenderService.SendEmailAsync(emailAddress, subject, html, cc: new List<string> { emailAddress }, bcc: new List<string> { emailAddress }, settings: new ExtendedEmailSenderSettings(sendFrom));

        //return Ok(new { html }); // by default, angular expects JSON reponseTypes. We can change that behavior if we needed to.
    }

    [HttpGet]
    public IActionResult ChartData()
    {
        // the framework example is displaying two series. A simple way to do that is to return a collection of collections.
        var data = new int[][]
        {
            new int [] {65, 59, 80, 81, 56, 55, 40 },
            new int [] {28, 48, 40, 19, 86, 27, 90 }
        };
        return Json(data);
    }

    [HttpGet]
    public IActionResult Autocomplete(string filter)
    {
        return string.IsNullOrEmpty(filter)
            ? Json(_people)
            : (IActionResult)Json(_people.Where(l => l.Contains(filter, StringComparison.InvariantCultureIgnoreCase)));
    }

    [HttpGet]
    public async Task<IActionResult> Random(bool useCache)
    {
        return Ok((await _randomRepository.GetSingleAsync(useCache)).Value);
    }

    #region File Examples
    [HttpPost, DisableRequestSizeLimit]
    public IActionResult UploadFile(IFormFile file)
    {
        if (file.FileName.EndsWith(".csv"))
        {
            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.CurrentCulture);
            var data = csv.GetRecords<CsvExampleExportModel>().ToList();

            return Ok(new { message = $"{data.Count} record(s) loaded from csv." });
        }
        else if (file.FileName.EndsWith(".xlsx"))
        {
            using var parser = new XlsxParser(file.OpenReadStream(), CultureInfo.InvariantCulture);
            using var csv = new CsvReader(parser);
            var data = csv.GetRecords<CsvExampleExportModel>().ToList();

            return Ok(new { message = $"{data.Count} record(s) loaded from xlsx." });
        }

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> DownloadFavicon()
    {
        var directory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        if (!Directory.Exists(directory))
        {
            directory = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "src", "assets");
        }

        // get the favicon for download
        var filePath = Directory.GetFiles(directory, "*.ico").First();

        var memoryStream = new MemoryStream();
        await using var stream = new FileStream(filePath, FileMode.Open);
        await stream.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        var provider = new FileExtensionContentTypeProvider();
        if (!provider.TryGetContentType(filePath, out var contentType))
        {
            contentType = "application/octet-stream";
        }

        return File(memoryStream, contentType, filePath);
    }

    [HttpGet]
    public IActionResult DownloadPdf(DownloadPdfViewModel viewModel)
    {
        if (viewModel.PdfSection == PdfSection.Body)
        {
            viewModel.Data = "Some example text.";
            return PdfFile(viewModel, "PdfExample.pdf", options: new()
            {
                // in order to provide a header or footer for PDF generation, you must provide a URL which Rotativa will perform a GET request to. 
                // that response is used as the header/footer.
                HeaderHtml = Url.ActionLink(nameof(DownloadPdf), null, viewModel.Clone(PdfSection.Header)),
                FooterHtml = Url.ActionLink(nameof(DownloadPdf), null, viewModel.Clone(PdfSection.Footer))
            });
        }
        else
        {
            return View(viewModel);
        }
    }

    [HttpGet]
    public IActionResult DownloadCsv(string prefix)
    {
        var result = new List<CsvExampleExportModel>
        {
            new() { Index = 0, CompanyName = $"{prefix}:Alphabet"},
            new() { Index = 1, CompanyName = $"{prefix}:Meta" }
        };

        using var writer = new StringWriter();
        using var csv = new CsvWriter(writer, CultureInfo.CurrentCulture);
        csv.WriteRecords(result);

        return CsvFile(writer, "CsvExample");
    }

    [HttpGet]
    public IActionResult DownloadXlsx(string prefix)
    {
        var result = new List<CsvExampleExportModel>
        {
            new() { Index = 0, CompanyName = $"{prefix}:Alphabet"},
            new() { Index = 1, CompanyName = $"{prefix}:Meta" }
        };

        var workbook = new XLWorkbook();
        var sheet = workbook.Worksheets.Add("Demo");

        using var writer = new StringWriter();
        using var csv = new XlsxWriter(sheet, CultureInfo.CurrentCulture);
        csv.WriteRecords(result);

        return XlsxFile(workbook, "XlsxExample");
    }
    #endregion 

    #region Date / Time Examples
    [HttpGet]
    public IActionResult Date(bool utcNow)
    {
        return utcNow ? Ok(System.DateTime.UtcNow) : Ok(System.DateTime.Now);
    }

    [HttpPost]
    public IActionResult Date([FromBody] DateTime date)
    {
        return Ok(date);
    }

    [HttpGet]
    public async Task<IActionResult> DateTime()
    {
        var item = await _dateTimeRepository.GetSingleAsync(UserContext);
        return Ok(item);
    }

    [HttpPut]
    public async Task<IActionResult> DateTime([FromBody] DateTimeItem dateTime)
    {
        var result = await _dateTimeRepository.UpdateAsync(dateTime);
        return Ok(result);
    }

    [HttpGet]
    public IActionResult DateOnly(DateOnly dateOnly)
    {
        return Ok(dateOnly);
    }

    [HttpGet]
    public IActionResult TimeOnly(TimeOnly timeOnly)
    {
        return Ok(timeOnly);
    }
    #endregion

    #region Error Handling + Invalid Model State Examples

    [HttpGet]
    public async Task<IActionResult> BadRequestError(bool causeDatabaseError)
    {
        if (causeDatabaseError)
        {
            _ = await _dateTimeRepository.GetSingleAsync(UserContext, causeDatabaseError);

            // throw an exception if we reach this line of code - we shouldn't if the above line does what it is supposed to do (throw a DatabaseException)
            throw new NotImplementedException("A database error was supposed to have been thrown.");
        }
        return BadRequest("This is a bad request.");
    }

    [HttpPost]
    public IActionResult ServerError()
    {
        throw new Exception("This is a server error.");
    }

    [HttpPost]
    public IActionResult InvalidModelState([FromBody] InvalidModelStateDto dto)
    {
        return HandleInvalidModelState(dto);
    }

    [HttpPost, InvalidModelStateFilter(Bypass = true)]
    public IActionResult BypassableInvalidModelState([FromBody] InvalidModelStateDto dto)
    {
        return HandleInvalidModelState(dto);
    }

    private IActionResult HandleInvalidModelState(InvalidModelStateDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Your model state is invalid.");
        }

        return Ok(dto);
    }
    #endregion
}
