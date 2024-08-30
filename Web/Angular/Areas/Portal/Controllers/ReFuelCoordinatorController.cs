using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Repository.Infrastructure;
using Repository.Infrastructure.Azure;
using Repository.Repositories.Common.User;
using Repository.Repositories.Staff;
using Repository.Repositories.Staff.ReFuelInquiries;
using Repository.Repositories.Student;

using Shared.Helpers;

namespace Api.Controllers;

[Route("api/{controller}/{action}"), Authorize(Roles = UserRoles.Staff)]
public class ReFuelCoordinatorController: ApiControllerBase
{
    private readonly MessageQueueService _messageQueueService;
    private readonly ReFuelRepository _reFuelRepository;
    private readonly ReFuelInquiryRepository _reFuelInquiryRepository;
    private readonly ReFuelReservationRepository _reFuelReservationRepository;
    private readonly ReFuelLogRepository _reFuelLogRepository;
    private readonly UserRepository _userRepository;

    public ReFuelCoordinatorController(
        MessageQueueService messageQueueService,
        ReFuelRepository reFuelRepository,
        ReFuelInquiryRepository reFuelInquiryRepository,
        ReFuelReservationRepository reFuelReservationRepository,
        ReFuelLogRepository reFuelLogRepository,
        UserRepository userRepository)
    {
        _messageQueueService = messageQueueService;
        _reFuelRepository = reFuelRepository;
        _reFuelInquiryRepository = reFuelInquiryRepository;
        _reFuelReservationRepository = reFuelReservationRepository;
        _reFuelLogRepository = reFuelLogRepository;
        _userRepository = userRepository;
    }

    #region Gets
    [HttpGet]
    public async Task<IActionResult> ReturnReFuel()
    {
        var result = await _reFuelRepository.GetByIdAsync();
        return Ok(result);
    }

    [HttpGet("{week}")]
    public async Task<IActionResult> ReturnReFuelReservations(DateTime week)
    {
        var result = await _reFuelReservationRepository.GetListAsync(week);
        return Ok(result);
    }

    [HttpGet("{studentId}/{day}")]
    public async Task<IActionResult> ReturnReFuelLogs(int studentId, DateTime day)
    {
        var result = await _reFuelLogRepository.GetListAsync(studentId, day);
        return Ok(result);
    }

    [HttpGet("{date}")]
    public async Task<IActionResult> ReturnReFuelInquiry(DateOnly date)
    {
        var result = await _reFuelInquiryRepository.GetByIdAsync(date);
        return Ok(result);
    }
    #endregion

    #region Puts
    [HttpPut]
    public async Task<IActionResult> UpdateReFuelInquiry(ReFuelInquiryItem inquiry)
    {
        var result = await _reFuelInquiryRepository.SyncAsync(inquiry);
        return Ok(result);
    }

    [HttpPut, Authorize(Roles = $"{UserRoles.Admin},{UserRoles.ReFuelCoordinator}")]
    public async Task<IActionResult> UpdateReFuel(ReFuelItem reFuel)
    {
        var promotions = await _reFuelRepository.UpdateWithPromotionsAsync(UserContext, reFuel);

        await Task.WhenAll(promotions.Select(promotion => SendReFuelPromotionEmail(promotion, _messageQueueService, Request)));

        return Ok(true);
    }

    [HttpPut, Authorize(Roles = $"{UserRoles.Admin},{UserRoles.ReFuelCoordinator}")]
    public async Task<IActionResult> UpdateReFuelReservation(ReFuelReservationItem reservation)
    {
        // currently - only rejects happen via this action
        var promotions = await _reFuelReservationRepository.UpdateWithPromotionsAsync(UserContext, reservation);

        var student = await _userRepository.ReturnUserById(reservation.StudentId);
        var subject = $"Your RE:Fuel reservation was cancelled.";
        var emailBody = new StringBuilder(EmailBuilder.BuildHeader(subject))
            .Append(EmailBuilder.BuildParagraph($"The reservation you had made for {reservation.Date.ToLongDateString()} was cancelled."))
            .ToString();
        await _messageQueueService.InsertIntoQueue(subject, emailBody, student.UserName);

        await Task.WhenAll(promotions.Select(promotion => SendReFuelPromotionEmail(promotion, _messageQueueService, Request)));

        return Ok(true);
    }

    [HttpPut("{studentId}/{day}"), Authorize(Roles = $"{UserRoles.Admin},{UserRoles.ReFuelCoordinator}")]
    public async Task<IActionResult> UpdateReFuelLogs(ReFuelLogItem[] logs, int studentId, DateTime day)
    {
        var result = await _reFuelLogRepository.UpdateAsync(UserContext, studentId, day, logs.Select(log =>
        {
            log.CheckedIn = UserContext.ToUsersTime(log.CheckedIn);
            log.CheckedOut = UserContext.ToUsersTime(log.CheckedOut);
            return log;
        }));
        return Ok(result);
    }
    #endregion

    public static Task SendReFuelPromotionEmail(ReFuelReservationPromotionModel promotion, MessageQueueService messageQueueService, HttpRequest request)
    {
        var subject = $"Your RE:Fuel reservation was promoted!";
        var emailBody = new StringBuilder(EmailBuilder.BuildHeader(subject))
            .Append(EmailBuilder.BuildParagraph($"The reservation you had made for {promotion.Date.ToLongDateString()} was promoted!"))
            .ToString();
        return messageQueueService.InsertIntoQueue(subject, emailBody, promotion.Email);
    }
}
