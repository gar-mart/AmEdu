using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Api.Helpers;
using Api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

using Repository.Infrastructure;
using Repository.Repositories.Attendance;
using Repository.Repositories.Attendance.ClassUsers;
using Repository.Repositories.Attendance.Communications;
using Repository.Repositories.Attendance.EngagementFlags;
using Repository.Repositories.Attendance.Enrollments;
using Repository.Repositories.Attendance.Points;
using Repository.Repositories.Attendance.Tardiness;
using Repository.Repositories.Common.Breaks;
using Repository.Repositories.Common.Student;
using Repository.Repositories.Orientation;
using Repository.Repositories.Staff;
using Repository.Repositories.Staff.EngagementReport;
using Repository.Repositories.Staff.QuoteOfTheDay;
using Repository.Repositories.Staff.StudentPictureReport;
using Repository.Repositories.Staff.StudentSearchInformation;

using Rotativa.AspNetCore;

using Shared.Helpers;

namespace Api.Controllers;

[Route("api/{controller}/{action}"), Authorize(Roles = UserRoles.Staff)]
public class StaffController: ApiControllerBase
{
    private readonly BreakRepository _breakRepository;
    private readonly ClassUserRepository _classUserRepository;
    private readonly CommunicationRepository _communicationRepository;
    private readonly CommunicationListRepository _communicationListRepository;
    private readonly EmailTemplateRepository _emailTemplateRepository;
    private readonly EngagementReportRepository _engagementReportRepository;
    private readonly EnrollmentRepository _enrollmentRepository;
    private readonly EngagementFlagRepository _engagementFlagRepository;
    private readonly InterventionRepository _interventionRepository;
    private readonly PointsRepository _pointsRepository;
    private readonly TardinessRepository _tardiesRepository;
    private readonly StudentSearchInformationRepository _studentSearchInformationRepository;
    private readonly QuoteOfTheDayRepository _quoteOfTheDayRepository;
    private readonly StudentRepository _studentRepository;
    private readonly StudentPictureReportRepository _studentPictureReportRepository;
    private readonly CommunityPassportFormRepository _communityPassportFormRepository;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public StaffController(
        BreakRepository breakRepository,
        ClassUserRepository classUserRepository,
        CommunicationRepository communicationRepository,
        CommunicationListRepository communicationListRepository,
        EmailTemplateRepository emailTemplateRepository,
        EngagementReportRepository engagementReportRepository,
        EnrollmentRepository enrollmentRepository,
        EngagementFlagRepository engagementFlagRepository,
        InterventionRepository interventionRepository,
        PointsRepository pointsRepository,
        QuoteOfTheDayRepository quoteOfTheDayRepository,
        StudentRepository studentRepository,
        StudentSearchInformationRepository studentSearchInformationRepository,
        TardinessRepository tardiesRepository,
        StudentPictureReportRepository studentPictureReportRepository,
        CommunityPassportFormRepository communityPassportFormRepository,
        IWebHostEnvironment webHostEnvironment)
    {
        _breakRepository = breakRepository;
        _classUserRepository = classUserRepository;
        _communicationRepository = communicationRepository;
        _communicationListRepository = communicationListRepository;
        _emailTemplateRepository = emailTemplateRepository;
        _engagementReportRepository = engagementReportRepository;
        _enrollmentRepository = enrollmentRepository;
        _engagementFlagRepository = engagementFlagRepository;
        _interventionRepository = interventionRepository;
        _pointsRepository = pointsRepository;
        _tardiesRepository = tardiesRepository;
        _studentSearchInformationRepository = studentSearchInformationRepository;
        _quoteOfTheDayRepository = quoteOfTheDayRepository;
        _studentRepository = studentRepository;
        _studentPictureReportRepository = studentPictureReportRepository;
        _communityPassportFormRepository = communityPassportFormRepository;
        _webHostEnvironment = webHostEnvironment;
    }

    #region Gets
    [HttpGet("{studentId}/{metric}/{startDate}/{endDate}")]
    public Task<EngagementMetricItem> ReturnEngagementMetricData(int studentId, string metric, DateTime startDate, DateTime endDate)
    {
        return _engagementReportRepository.GetMetricDataAsync(studentId, metric, startDate, endDate);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnStudentSearchInformation()
    {
        var result = await _studentSearchInformationRepository.GetListAsync(UserContext);
        return Ok(result);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> ReturnStudentSearchInformationByStudentId(int studentId)
    {
        var result = await _studentSearchInformationRepository.GetByIdAsync(UserContext, studentId);
        return Ok(result);
    }

    [HttpGet("{date}")]
    public async Task<IActionResult> ReturnQuotesOfTheDay(DateTime date)
    {
        var result = await _quoteOfTheDayRepository.GetListAsync(UserContext, date);
        return Ok(result);
    }

    [HttpGet("{studentId}/{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnCommunications(int studentId, DateTime startDate, DateTime endDate)
    {
        var result = await _communicationRepository.GetListAsync(studentId, startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{studentId}/{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnPoints(int studentId, DateTime startDate, DateTime endDate)
    {
        var result = await _pointsRepository.GetListAsync(studentId, startDate, endDate);
        return Ok(result);
    }


    [HttpGet]
    public async Task<IActionResult> ReturnPointBalances([FromQuery] List<string> gradeLevels)
    {
        var result = await _pointsRepository.ReturnPointBalances(gradeLevels);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnEngagementFlagNotifications()
    {
        var result = await _engagementFlagRepository.ReturnEngagementFlagNotifications(UserContext);
        return Ok(result);
    }

    [HttpGet("{date}")]
    public async Task<IActionResult> ReturnEngagementFlagReport(DateTime? date, bool? enrollmentStatus = null)
    {
        var schoolYear = date.HasValue ? new SchoolYear(date.Value) : (SchoolYear?)null;
        var result = await _engagementFlagRepository.ReturnEngagementFlagReportItems(schoolYear, enrollmentStatus);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{page}/{perPage}")]
    public async Task<IActionResult> ReturnEngagementReport(DateTime startDate, DateTime endDate, int page, int perPage, string studentName, string gradeLevel, bool? enrollmentStatus, bool myStudents, string school, string sortBy, string sortDirection)
    {
        var (items, total) = await _engagementReportRepository.GetListAsync(UserContext, startDate, endDate, page, perPage, studentName, gradeLevel, enrollmentStatus, myStudents, school, sortBy, sortDirection);
        return Ok(new
        {
            items,
            total
        });
    }
    [HttpGet("{startDate}/{endDate}/{studentId}")]
    public async Task<FileResult> ExportEngagementReportExcel(DateTime startDate, DateTime endDate, int studentId)
    {
        var result = await _engagementReportRepository.GetListAsync(UserContext, startDate, endDate, studentId);
        var student = result.First(x => x.Id == studentId);
        var (classUsers, _, _) = await _classUserRepository.GetByStudentId(student.Id, startDate, endDate);

        var model = new EngagementReportPdfModel
        {
            ClassUserModels = classUsers,
            EngagementReportItem = student,
            StartDate = startDate,
            EndDate = endDate,
        };

        var workbook = ExcelHelper.EngagementReport(model);
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);

        return File(stream.ToArray(), ContentTypes.Xlsx, $"Engagement Report - {student.Name.Replace(",", " ")} - {startDate:MMddyyyy} {endDate:MMddyyyy}.xlsx");
    }
    [HttpGet("{startDate}/{endDate}/{studentId}")]
    public async Task<IActionResult> ExportEngagementReportPdf(DateTime startDate, DateTime endDate, int studentId)
    {
        var templatePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Templates", "EngagementReportTemplate.cshtml");

        var result = await _engagementReportRepository.GetListAsync(UserContext, startDate, endDate, studentId);
        var student = result.First(x => x.Id == studentId);
        var (ClassUsers, StartDate, EndDate) = await _classUserRepository.GetByStudentId(student.Id, startDate, endDate);
        var model = new EngagementReportPdfModel
        {
            ClassUserModels = ClassUsers,
            EngagementReportItem = student,
            StartDate = startDate,
            EndDate = endDate,
        };

        var pdfFile = new ViewAsPdf("EngagementReportTemplate", model)
        {
            FileName = $"Engagement Report - {student.Name.Replace(",", " ")} - {startDate:MMddyyyy} {endDate:MMddyyyy}.pdf"
        };
        return pdfFile;
    }

    [HttpGet("{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnOutstandingEngagementFlagReport(DateTime startDate, DateTime endDate)
    {
        var result = await _engagementFlagRepository.ReturnOutstandingEngagementFlagReportItems(startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{chartGroupingFilter}/{schoolFilter}/{mentorFilter}")]
    public async Task<IActionResult> ReturnFlagResponsesReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var result = await _engagementFlagRepository.ReturnFlagResponsesReport(startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{chartGroupingFilter}/{schoolFilter}/{mentorFilter}")]
    public async Task<IActionResult> ReturnPointSourcePageReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var result = await _engagementFlagRepository.ReturnPointSourcePageReport(startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{chartGroupingFilter}/{schoolFilter}/{mentorFilter}")]
    public async Task<IActionResult> ReturnPointSourceStaffReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var result = await _engagementFlagRepository.ReturnPointSourceStaffReport(startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter);
        return Ok(result);
    }
    [HttpGet("{startDate}/{endDate}/{chartGroupingFilter}/{schoolFilter}/{mentorFilter}")]
    public async Task<IActionResult> ReturnPointTypesAwardedReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var result = await _engagementFlagRepository.ReturnPointTypesAwardedReport(startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{schoolFilter}")]
    public async Task<IActionResult> ReturnPointDetailReport(DateTime startDate, DateTime endDate, string schoolFilter)
    {
        var result = await _engagementFlagRepository.ReturnPointDetailReport(startDate, endDate, schoolFilter);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}/{chartGroupingFilter}/{schoolFilter}/{mentorFilter}")]
    public async Task<IActionResult> ReturnFlagsGeneratedReport(DateTime startDate, DateTime endDate, string chartGroupingFilter, string schoolFilter, int mentorFilter)
    {
        var result = await _engagementFlagRepository.ReturnFlagsGeneratedReport(startDate, endDate, chartGroupingFilter, schoolFilter, mentorFilter);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnFlaggedStudentsReport(DateTime startDate, DateTime endDate)
    {
        var result = await _engagementFlagRepository.ReturnFlaggedStudentsReport(startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnRejectedEngagementFlagReport(DateTime startDate, DateTime endDate)
    {
        var result = await _engagementFlagRepository.ReturnRejectedEngagementFlagReportItems(startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{includePictures}")]
    public async Task<IActionResult> ReturnStudentPictureReport(bool includePictures)
    {
        var result = await _studentPictureReportRepository.GetListAsync(includePictures);
        return Ok(result);
    }

    [HttpGet("{studentId}/{startDate?}/{endDate?}")]
    public async Task<IActionResult> ReturnClassUsersByStudentId(int studentId, DateTime? startDate, DateTime? endDate)
    {
        var result = await _classUserRepository.GetByStudentId(studentId, startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{studentId}/{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnTardies(int studentId, DateTime startDate, DateTime endDate)
    {
        var result = await _tardiesRepository.GetListAsync(studentId, startDate, endDate);
        return Ok(result);
    }

    [HttpGet("{gradeLevel}/{emailDomain}/{startDate}/{endDate}")]
    public async Task<IActionResult> DownloadEnrollmentReport(string gradeLevel, string emailDomain, DateTime startDate, DateTime endDate, [FromQuery] int[] studentIds)
    {
        if (string.Equals(gradeLevel, "All", StringComparison.InvariantCultureIgnoreCase))
        {
            gradeLevel = null;
        }
        if (string.Equals(emailDomain, "All", StringComparison.InvariantCultureIgnoreCase))
        {
            emailDomain = null;
        }

        var enrollments = await _enrollmentRepository.ReturnEnrollmentReport(startDate, endDate, gradeLevel, emailDomain, studentIds);

        if (!enrollments.Any())
        {
            return BadRequest("No student enrollments found for this criteria. Please update your filters.");
        }

        var workbook = ExcelHelper.AttendanceReport(enrollments);
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);

        var fileNameParts = new List<string>
        {
            "Attendance Report",
            startDate.ToString("MMddyyyy"),
            endDate.ToString("MMddyyyy"),
        };

        if (gradeLevel != null)
        {
            fileNameParts.Add(gradeLevel);
        }

        if (emailDomain != null)
        {
            fileNameParts.Add(emailDomain);
        }

        return File(stream.ToArray(), ContentTypes.Xlsx, $"{string.Join(" - ", fileNameParts)}.xlsx");
    }

    [HttpGet]
    public async Task<IActionResult> ReturnCommunicationLists()
    {
        var items = await _communicationListRepository.GetListAsync(UserContext);
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ReturnCommunicationList(int id)
    {
        var item = await _communicationListRepository.GetByIdAsync(id);
        return Ok(item);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnEmailTemplates()
    {
        var items = await _emailTemplateRepository.GetListAsync(UserContext);
        return Ok(items);
    }
    #endregion

    #region Posts
    [HttpPost("{date}")]
    [Obsolete]
    public async Task<IActionResult> CreateQuoteOfTheDay(DateTime date, QuoteOfTheDayItem quoteOfTheDayItem)
    {
        var getQuotesOfTheDay = _quoteOfTheDayRepository.GetListAsync(UserContext, date);
        quoteOfTheDayItem.Id = await _quoteOfTheDayRepository.CreateAsync(UserContext, quoteOfTheDayItem, date);

        return quoteOfTheDayItem.Id <= 0
            ? Problem("Create failed")
            : await UpdateQuotesOfTheDayHelper(date, (await getQuotesOfTheDay).Append(quoteOfTheDayItem).ToList())
            ? Ok(quoteOfTheDayItem.Id)
            : Problem("Update failed");
    }

    [HttpPost]
    public async Task<IActionResult> CreateCommunication(CommunicationItem item)
    {
        item.StaffId = UserContext.UserId;
        item.Date = UserContext.ToUsersTime(item.Date);
        var result = await _communicationRepository.CreateAsync(item);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePoints(PointsItem item)
    {
        if (item.Date == default)
        {
            item.Date = UserContext.CurrentDateTime;
        }
        item.StaffId = UserContext.UserId;
        var result = await _pointsRepository.CreateAsync(UserContext, item);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePointsList(List<PointsItem> items)
    {
        foreach (var item in items)
        {
            if (item.Date == default)
            {
                item.Date = UserContext.CurrentDateTime;
            }
            item.StaffId = UserContext.UserId;
        }
        _ = await _pointsRepository.CreateListAsync(UserContext, items);

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> SaveCommunicationList(CommunicationListModel model)
    {
        var result = await _communicationListRepository.SaveAsync(UserContext, model);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> ReturnPotentialCommunicationListEntries(CommunicationFilter filter)
    {
        var result = await _communicationListRepository.GetPotentialEntriesAsync(filter);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> UpdateCommunityPassportForms([FromBody] IEnumerable<CommunityPassportFormItem> items)
    {
        var result = await _communityPassportFormRepository.UpdateAsync(items);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> GenerateIntervention([FromBody] GenerateInterventionDto dto)
    {
        var result = await _interventionRepository.GenerateInterventionAsync(UserContext, dto.StudentId, dto.Reason);
        return Ok(result);
    }
    #endregion

    #region Puts
    [HttpPut("{date}")]
    [Obsolete]
    public async Task<IActionResult> UpdateQuotesOfTheDay(DateTime date, List<QuoteOfTheDayItem> quotesOfTheDay)
    {
        return Ok(await UpdateQuotesOfTheDayHelper(date, quotesOfTheDay));
    }

    [HttpPut, Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> UpdateBreak(BreakItem item)
    {
        var result = await _breakRepository.UpdateAsync(item);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCommunication(CommunicationItem item)
    {
        item.Date = UserContext.ToUsersTime(item.Date);
        var result = await _communicationRepository.UpdateAsync(item);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateEngagementFlag(EngagementFlagItem item)
    {
        var result = await _engagementFlagRepository.UpdateAsync(UserContext, item);
        var interventions = await _interventionRepository.GetBySearchAsync(item.UserId, new SchoolYear(item.WeekOfDate));
        return Ok(interventions.FirstOrDefault(i => !i.LogOnly));
    }

    [HttpPut("{studentId}/{date?}")]
    public async Task<IActionResult> UpdateEnrollmentDate(int studentId, DateTime? date)
    {
        var result = await _studentRepository.UpdateEnrollmentDate(studentId, date);
        return Ok(result);
    }

    [HttpPut("{studentId}/{date?}")]
    public async Task<IActionResult> UpdateUnenrollmentDate(int studentId, DateTime? date)
    {
        var result = await _studentRepository.UpdateUnenrollmentDate(studentId, date);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> SaveEmailTemplate(EmailTemplateItem item)
    {
        var result = await _emailTemplateRepository.CreateAsync(UserContext, item);
        return Ok(result);
    }
    #endregion

    #region Deletes
    [HttpDelete("{id}/{date}")]
    [Obsolete]
    public async Task<IActionResult> DeleteQuoteOfTheDay(int id, DateTime date)
    {
        var result = await _quoteOfTheDayRepository.DeleteAsync(UserContext, id);
        var quotesOfTheDay = await _quoteOfTheDayRepository.GetListAsync(UserContext, date);

        return Ok(result && await UpdateQuotesOfTheDayHelper(date, quotesOfTheDay.Cast<QuoteOfTheDayItem>().ToList()));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCommunication(int id)
    {
        var result = await _communicationRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePoints(int id)
    {
        var result = await _pointsRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCommunicationList(int id)
    {
        var result = await _communicationListRepository.DeleteAsync(UserContext, id);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmailTemplate(int id)
    {
        var result = await _emailTemplateRepository.DeleteAsync(UserContext, id);
        return Ok(result);
    }
    #endregion

    [Obsolete]
    private async Task<bool> UpdateQuotesOfTheDayHelper(DateTime date, List<QuoteOfTheDayItem> quotesOfTheDay)
    {
        var updateTasks = new List<Task<bool>>();

        for (var i = 0; i < quotesOfTheDay.Count; i++)
        {
            quotesOfTheDay[i].OrderBy = i;
            updateTasks.Add(_quoteOfTheDayRepository.UpdateAsync(UserContext, quotesOfTheDay[i], date));
        }

        var results = await Task.WhenAll(updateTasks);
        return results.All(result => result);
    }
}
