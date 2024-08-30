using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Api.Helpers;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using Repository.Azure;
using Repository.Infrastructure;
using Repository.Repositories.Attendance.Enrollments;
using Repository.Repositories.Attendance.InterventionThresholds;
using Repository.Repositories.Common.Breaks;
using Repository.Repositories.Common.Staff;
using Repository.Repositories.Orientation.ElectiveGroupChoices;
using Repository.Repositories.Orientation.ElectiveGroups;
using Repository.Repositories.Orientation.Electives;
using Repository.Repositories.Orientation.ElectiveSetting;
using Repository.Repositories.Student.AppTileMetadata;
using Repository.Repositories.Student.StudentResource;

using Shared.Helpers;

using Web.Areas.Account.Hubs;

namespace Api.Controllers;

[Route("api/{controller}/{action}"), Authorize(Roles = UserRoles.Admin)]
public class AdminController: ApiControllerBase
{
    private readonly IHubContext<AccountHub, IAccountHub> _accountHubContext;
    private readonly StaffRepository _staffRepository;
    private readonly BreakRepository _breakRepository;
    private readonly EnrollmentRepository _enrollmentRepository;
    private readonly EntityBlobService _entityBlobService;
    private readonly InterventionThresholdRepository _interventionThresholdRepository;
    private readonly StudentResourceRepository _studentResourceRepository;
    private readonly AppTileMetadataRepository _appTileMetadataRepository;
    private readonly ElectiveGroupRepository _electiveGroupRepository;
    private readonly ElectiveRepository _electiveRepository;
    private readonly ElectiveGroupChoiceRepository _electiveGroupChoiceRepository;
    private readonly ElectiveSettingRepository _electiveSettingRepository;


    public AdminController(
        IHubContext<AccountHub, IAccountHub> accountHubContext,
        StaffRepository staffRepository,
        BreakRepository breakRepository,
        EnrollmentRepository enrollmentRepository,
        EntityBlobService entityBlobService,
        InterventionThresholdRepository interventionThresholdRepository,
        AppTileMetadataRepository appTileMetadataRepository,
        StudentResourceRepository studentResourceRepository,
        ElectiveSettingRepository electiveSettingRepository,
        ElectiveRepository electiveRepository,
        ElectiveGroupRepository electiveGroupRepository,
        ElectiveGroupChoiceRepository electiveGroupChoiceRepository)
    {
        _accountHubContext = accountHubContext;
        _staffRepository = staffRepository;
        _breakRepository = breakRepository;
        _enrollmentRepository = enrollmentRepository;
        _entityBlobService = entityBlobService;
        _interventionThresholdRepository = interventionThresholdRepository;
        _appTileMetadataRepository = appTileMetadataRepository;
        _studentResourceRepository = studentResourceRepository;
        _electiveSettingRepository = electiveSettingRepository;
        _electiveRepository = electiveRepository;
        _electiveGroupRepository = electiveGroupRepository;
        _electiveGroupChoiceRepository = electiveGroupChoiceRepository;
    }

    #region Gets
    [HttpGet("{year}")]
    public async Task<IActionResult> ReturnBreaks(short year)
    {
        var result = await _breakRepository.GetListAsync(year);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnInterventionThresholds()
    {
        var result = await _interventionThresholdRepository.GetListAsync();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnAppTiles()
    {
        var result = await _appTileMetadataRepository.GetMetadataListAsync();
        return Ok(result);
    }

    #endregion

    #region Posts
    [HttpPost]
    public async Task<IActionResult> CreateBreak(BreakItem item)
    {
        var result = await _breakRepository.CreateAsync(item);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> UploadEnrollmentImportData(IFormFile file)
    {
        if (file.ContentType != ContentTypes.Xlsx)
        {
            return BadRequest("The file is not a valid type. it should be an .xlsx file.");
        }

        // get the sheet data
        using var fileStream = file.OpenReadStream();
        using var spreadsheetDocument = SpreadsheetDocument.Open(fileStream, isEditable: false);
        var workbookPart = spreadsheetDocument.WorkbookPart;
        var sheetData = workbookPart.WorksheetParts.First().Worksheet.Elements<SheetData>().First();

        // validate the headers
        var headers = sheetData.Elements<Row>().FirstOrDefault()?.Elements<Cell>()?.ToList() ?? new List<Cell>();

        var headerNames = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase) { EnrollmentItem.StudentFirstNameHeader, EnrollmentItem.StudentLastNameHeader, EnrollmentItem.EnrollmentDateHeader, EnrollmentItem.UnenrollmentDateHeader, EnrollmentItem.UICNumberHeader };
        var headerIndexes = new Dictionary<string, int>(StringComparer.InvariantCultureIgnoreCase);

        for (var i = 0; i < headers.Count; i++)
        {
            var header = workbookPart.GetText(headers[i]);

            if (headerNames.Contains(header))
            {
                if (headerIndexes.ContainsKey(header))
                {
                    return BadRequest($"The header \"{header}\" is specified more than once.");
                }
                headerIndexes.Add(header, i);
            }

            if (headerIndexes.Count == headerNames.Count)
            {
                break; // found all the relevant headers
            }
        }

        if (headerNames.Count != headerIndexes.Count)
        {
            return BadRequest($"There are missing headers. Make sure all headers are in your file and on the first row. ({string.Join(", ", headerNames)})");
        }

        // parse the enrollment data
        var enrollments = new List<EnrollmentItem>();
        foreach (var r in sheetData.Elements<Row>().Skip(1)) // skip the header
        {
            var cells = r.Elements<Cell>();

            var enrollment = new EnrollmentItem
            {
                FirstName = workbookPart.GetText(cells.ElementAtOrDefault(headerIndexes[EnrollmentItem.StudentFirstNameHeader])),
                LastName = workbookPart.GetText(cells.ElementAtOrDefault(headerIndexes[EnrollmentItem.StudentLastNameHeader])),
                EnrollmentDate = DateTime.TryParse(workbookPart.GetText(cells.ElementAtOrDefault(headerIndexes[EnrollmentItem.EnrollmentDateHeader])) ?? "", out var enrollmentDate) ? enrollmentDate : null,
                UnenrollmentDate = DateTime.TryParse(workbookPart.GetText(cells.ElementAtOrDefault(headerIndexes[EnrollmentItem.UnenrollmentDateHeader])) ?? "", out var unenrollmentDate) ? unenrollmentDate : null,
                UICNumber = long.TryParse(workbookPart.GetText(cells.ElementAtOrDefault(headerIndexes[EnrollmentItem.UICNumberHeader])), out var uicNumber) ? uicNumber : null,
            };

            if (enrollment.HasData)
            {
                if (enrollment.IsIncomplete)
                {
                    return BadRequest($"At least one enrollment row in the file is missing a first name, last name, or UIC number. All are required. ({enrollment})");
                }

                // don't add data for a row with empty values in each column
                enrollments.Add(enrollment);
            }
        }

        // validate the enrollment data
        if (!enrollments.Any())
        {
            return BadRequest("No valid student data was found in the file.");
        }

        var matchedEnrollmentData = await _enrollmentRepository.MatchStudentEnrollmentsAsync(enrollments);
        return Ok(matchedEnrollmentData);
    }

    [HttpPost]
    public async Task<IActionResult> AddAppTileMetadata(AppTileMetadataModel model)
    {
        var result = await _appTileMetadataRepository.AddAppTileMetadata(model);
        return Ok(result);
    }

    #endregion

    #region Puts
    [HttpPut]
    public async Task<IActionResult> UpdateInterventionThreshold(InterventionThresholdItem item)
    {
        var result = await _interventionThresholdRepository.UpdateAsync(item);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateEnrollments(List<EnrollmentItem> items)
    {
        foreach (var item in items)
        {
            if (!await _enrollmentRepository.UpdateAsync(item))
            {
                return Ok(false);
            }
        }

        return Ok(true);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAppTileMetadata(AppTileMetadataModel model)
    {
        var result = await _appTileMetadataRepository.UpdateAppTileMetadata(model);

        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAppTileGradeLevels(AppTileMetadataModel appTileItem)
    {
        //Delete list
        var result = await _appTileMetadataRepository.DeleteAppTileGradeLevelsByMetadataId(appTileItem.Id);
        foreach (var grade in appTileItem.AppTileGradeLevels)
        {
            //Add new list to database.
            _ = await _appTileMetadataRepository.AddAppTileGradeLevel(appTileItem.Id, grade.GradeLevel);
        }

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UploadAppTileImage(int id, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var url = await _entityBlobService.UploadAppShortcut(stream, id, file.ContentType);
        var result = await _appTileMetadataRepository.UpdateAppTileMetadata(id, url);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateStaffMember(StaffItem staffMember)
    {
        var result = await _staffRepository.UpdateStaffMemberAsync(staffMember);

        await AccountHub.RefreshUsersAsync(_accountHubContext, staffMember.Id);

        return Ok(result);
    }
    #endregion

    #region Deletes
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBreak(int id)
    {
        var result = await _breakRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppTileMetadata(int id)
    {
        var result = await _appTileMetadataRepository.DeleteAppTileMetadata(id);
        return Ok(result);
    }

    #endregion

    #region [StudentResources] 

    [HttpGet, AllowAnonymous]
    public async Task<IActionResult> ReturnStudentResources()
    {
        var result = await _studentResourceRepository.GetListAsync();
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddStudentResource(StudentResourceModel studentResourceModel)
    {
        var result = await _studentResourceRepository.AddStudentResource(studentResourceModel);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateStudentResource(StudentResourceModel studentResourceModel)
    {
        var result = await _studentResourceRepository.UpdateStudentResourceAndMetadata(studentResourceModel);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> UpdateStudentResourceGradeLevels(StudentResourceModel studentResourceModel)
    {
        var gradeLevels = studentResourceModel.StudentResourceGradeLevels.Select(x => x.GradeLevel);
        var result = await _studentResourceRepository.UpdateStudentResourceGradeLevels(studentResourceModel.Id, gradeLevels);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudentResource(int id)
    {
        var result = await _studentResourceRepository.DeleteStudentResource(id);
        return Ok(result);
    }

    #endregion

    [HttpPut]
    public async Task<IActionResult> UpdateElectiveSettings(ElectiveSettingItem[] electiveSettingItems)
    {
        var result = await _electiveSettingRepository.UpdateElectiveSettings(electiveSettingItems);
        return Ok(result);
    }

    #region [Electives]

    [HttpPost]
    public async Task<IActionResult> AddElective(ElectiveModel electiveModel)
    {
        var result = await _electiveRepository.AddElective(electiveModel);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateElective(ElectiveModel electiveModel)
    {
        var result = await _electiveRepository.UpdateElectiveAndSemesterElectives(electiveModel);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteElective(int id)
    {
        var result = await _electiveRepository.DeleteAsync(id);
        return Ok(result);
    }

    #endregion

    [HttpGet]
    public async Task<IActionResult> ReturnAppTileMetadataBySearch(string searchTerm)
    {
        var result = await _appTileMetadataRepository.ReturnAppTilesBySearch(searchTerm);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnStudentResourcesBySearch(string searchTerm)
    {
        var result = await _studentResourceRepository.ReturnStudentResourcesBySearch(searchTerm);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteElectiveGroupChoice(int id)
    {
        var result = await _electiveGroupChoiceRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteElectiveGroup(int id)
    {
        var result = await _electiveGroupRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateElectiveGroup(ElectiveGroupItem item)
    {
        var result = await _electiveGroupRepository.CreateAsync(item);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateElectiveGroupChoice(ElectiveGroupChoiceItem item)
    {
        var result = await _electiveGroupChoiceRepository.CreateAsync(item);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateElectiveGroup(ElectiveGroupItem electiveGroupItem)
    {
        var result = await _electiveGroupRepository.UpdateAsync(electiveGroupItem);
        return Ok(result);
    }
}
