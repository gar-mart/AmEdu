using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Repository.Infrastructure;
using Repository.Infrastructure.Azure;
using Repository.Repositories.Attendance.EngagementFlags;
using Repository.Repositories.Attendance.InterventionThresholds;
using Repository.Repositories.Attendance.Points;
using Repository.Repositories.Common.User;
using Repository.Repositories.Staff.EngagementReport;
using Repository.Repositories.Staff.QuoteOfTheDay;
using Repository.Repositories.Student;
using Repository.Repositories.Student.Announcements;
using Repository.Repositories.Student.AppTiles;
using Repository.Repositories.Student.StudentInformation;

using Shared.Helpers;

namespace Api.Controllers;

[Route("api/{controller}/{action}")]
public class StudentController: ApiControllerBase
{
    private readonly MessageQueueService _messageQueueService;
    private readonly AnnouncementRepository _announcementRepository;
    private readonly AppTileRepository _appTileRepository;
    private readonly InterventionThresholdRepository _interventionThresholdRepository;
    private readonly UserRepository _userRepository;
    private readonly QuoteOfTheDayRepository _quoteOfTheDayRepository;
    private readonly PointsRepository _pointsRepository;
    private readonly StudentInformationRepository _studentInformationRepository;
    private readonly ReFuelReservationRepository _reFuelReservationRepository;
    private readonly EngagementReportRepository _engagementReportRepository;
    private readonly EngagementFlagRepository _engagementFlagRepository;

    public StudentController(
        MessageQueueService messageQueueService,
        AnnouncementRepository announcementRepository,
        AppTileRepository appTileRepository,
        InterventionThresholdRepository interventionThresholdRepository,
        QuoteOfTheDayRepository quoteOfTheDayRepository,
        PointsRepository pointsRepository,
        StudentInformationRepository studentInformationRepository,
        ReFuelReservationRepository reFuelReservationRepository,
        EngagementReportRepository engagementReportRepository,
        EngagementFlagRepository engagementFlagRepository,

        UserRepository userRepository)
    {
        _messageQueueService = messageQueueService;
        _announcementRepository = announcementRepository;
        _appTileRepository = appTileRepository;
        _interventionThresholdRepository = interventionThresholdRepository;
        _userRepository = userRepository;
        _quoteOfTheDayRepository = quoteOfTheDayRepository;
        _pointsRepository = pointsRepository;
        _studentInformationRepository = studentInformationRepository;
        _reFuelReservationRepository = reFuelReservationRepository;
        _engagementReportRepository = engagementReportRepository;
        _engagementFlagRepository = engagementFlagRepository;
    }

    #region Gets
    [HttpGet("{studentId}/{startDate}/{endDate}")]
    public Task<AssignmentsCompletedModel> ReturnAssignmentsCompleted(int studentId, DateTime startDate, DateTime endDate)
    {
        return _engagementReportRepository.GetAssignmentsCompletedAsync(studentId, startDate, endDate);
    }

    [HttpGet("{studentId}/{date?}")]
    public async Task<IActionResult> ReturnEngagementFlagsByStudentId(int studentId, DateTime? date, bool? acknowledgedByStudent)
    {
        if (!User.IsInRole(UserRoles.Staff) && UserContext.UserId != studentId)
        {
            return Unauthorized("Students cannot view other student's engagement flags.");
        }

        var schoolYear = date.HasValue ? new SchoolYear(date.Value) : (SchoolYear?)null;
        var result = await _engagementFlagRepository.ReturnByStudentId(studentId, schoolYear, acknowledgedByStudent);
        return Ok(result);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> ReturnAppTiles(int studentId)
    {
        var currentUserId = User.IsInRole(UserRoles.Staff) ? studentId : UserContext.UserId;

        var result = await _appTileRepository.GetListAsync(currentUserId);
        return Ok(result);
    }

    [HttpGet("{date}")]
    public async Task<IActionResult> ReturnQuoteOfTheDay(DateTime date)
    {
        var result = await _quoteOfTheDayRepository.GetQuoteOfTheDay(date);
        return Ok(result);
    }

    [HttpGet("{grade}")]
    public async Task<IActionResult> ReturnInterventionThreshold(string grade)
    {
        var result = await _interventionThresholdRepository.GetByGrade(grade);
        return Ok(result);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> ReturnAnnouncements(int studentId)
    {
        var currentUserId = User.IsInRole(UserRoles.Staff) ? studentId : UserContext.UserId;

        var result = await _announcementRepository.GetListAsync(currentUserId, UserContext.CurrentDateTime);
        return Ok(result);
    }

    [HttpGet("{studentId}/{pointsType}")]
    public async Task<IActionResult> ReturnPointDetails(int studentId, PointsType pointsType)
    {
        var result = await _pointsRepository.ReturnDetailsAsync(studentId, pointsType);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ReturnAnnouncementById(int id)
    {
        var announcement = await _announcementRepository.GetByIdAsync(id);
        return Ok(announcement);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> ReturnStudentInformationById(int studentId)
    {
        var studentInformation = await _studentInformationRepository.GetByIdAsync(studentId);
        return Ok(studentInformation);
    }

    [HttpGet("{studentId}/{date}")]
    public async Task<IActionResult> ReturnReFuelReservationById(int studentId, DateTime date)
    {
        var item = await _reFuelReservationRepository.GetByIdAsync(studentId, date);
        return Ok(new { reservation = item.Item1, eligibility = item.Item2 });
    }
    #endregion

    #region Posts
    [HttpPost("{studentId}")]
    public async Task<IActionResult> UpdateAppTiles(int studentId, List<AppTileModel> appTiles)
    {
        var currentUserId = User.IsInRole(UserRoles.Staff) ? studentId : UserContext.UserId;

        var appTileUpdates = new List<Task<bool>>();

        for (var i = 0; i < appTiles.Count; i++)
        {
            appTiles[i].OrderBy = i;
            appTileUpdates.Add(_appTileRepository.UpdateAsync(currentUserId, appTiles[i]));
        }

        var results = await Task.WhenAll(appTileUpdates);

        return Ok(results.All(result => result));
    }

    [HttpPost]
    public async Task<IActionResult> MarkAnnouncementRead(AnnouncementModel announcement)
    {
        if (User.IsInRole(UserRoles.Staff))
        {
            return Ok(true); // don't let staff members mark announcements as read
        }

        var result = await _announcementRepository.MarkAnnouncementRead(UserContext, announcement.Id);
        return Ok(result);
    }

    [HttpPost("{date}/{type}")]
    public async Task<IActionResult> ReserveReFuelReservation(DateTime date, int type, string generalInquiryResponse, string breakfastInquiryResponse, string lunchInquiryResponse)
    {
        if (User.IsInRole(UserRoles.Staff))
        {
            return Ok(false); // don't let staff members sign up students
        }

        var (OpenSpot, StandbyPosition) = await _reFuelReservationRepository.ReserveAsync(UserContext, date, (ReFuelReservationType)type, generalInquiryResponse, breakfastInquiryResponse, lunchInquiryResponse);
        return Ok(new { OpenSpot, StandbyPosition });
    }
    #endregion

    #region Puts
    [HttpPut]
    public async Task<IActionResult> UpdateStudentInformation(StudentInformationItem studentInformation)
    {
        var result = await _studentInformationRepository.UpdateAsync(studentInformation);
        return Ok(result);
    }

    [HttpPut("{date}")]
    public async Task<IActionResult> CancelReFuelReservation(DateTime date)
    {
        if (User.IsInRole(UserRoles.Staff))
        {
            return Ok(false); // don't let staff members cancel
        }

        var promotions = await _reFuelReservationRepository.CancelAsync(UserContext, date);

        await Task.WhenAll(promotions.Select(promotion => ReFuelCoordinatorController.SendReFuelPromotionEmail(promotion, _messageQueueService, Request)));

        return Ok(true);
    }

    [HttpPut("{id}/{acknowledgedByStudent}")]
    public async Task<IActionResult> AcknowledgeEngagementFlag(int id, bool acknowledgedByStudent)
    {
        if (User.IsInRole(UserRoles.Staff))
        {
            return Ok(false); // don't let staff members acknowledge student flags
        }

        var result = await _engagementFlagRepository.AcknowledgeEngagementFlagAsync(id, acknowledgedByStudent);

        return Ok(result);
    }
    #endregion
}
