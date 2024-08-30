using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Repository.Azure;
using Repository.Infrastructure;
using Repository.Repositories.Attendance;

using Shared.Helpers;

namespace Api.Controllers;

[Route("api/{controller}/{action}"), Authorize(Roles = UserRoles.Staff)]
public class InterventionController: ApiControllerBase
{
    private readonly InterventionRepository _interventionRepository;
    private readonly EntityBlobService _entityBlobService;
    private readonly InterventionEmailTemplateRepository _interventionEmailTemplateRepository;
    private readonly InterventionEmailCommunicationRepository _interventionEmailCommunicationRepository;
    private readonly InterventionSuccessPlanRepository _interventionSuccessPlanRepository;
    private readonly InterventionScheduledMeetingRepository _interventionScheduledMeetingRepository;
    private readonly InterventionTruancyFormRepository _interventionTruancyFormRepository;

    public InterventionController(
        EntityBlobService entityBlobService,
        InterventionRepository interventionRepository,
        InterventionEmailCommunicationRepository interventionEmailCommunicationRepository,
        InterventionSuccessPlanRepository interventionSuccessPlanRepository,
        InterventionScheduledMeetingRepository interventionScheduledMeetingRepository,
        InterventionTruancyFormRepository interventionTruancyFormRepository,
        InterventionEmailTemplateRepository interventionEmailTemplateRepository)
    {
        _entityBlobService = entityBlobService;
        _interventionEmailCommunicationRepository = interventionEmailCommunicationRepository;
        _interventionSuccessPlanRepository = interventionSuccessPlanRepository;
        _interventionScheduledMeetingRepository = interventionScheduledMeetingRepository;
        _interventionTruancyFormRepository = interventionTruancyFormRepository;
        _interventionRepository = interventionRepository;
        _interventionEmailTemplateRepository = interventionEmailTemplateRepository;
    }

    [HttpGet("{studentId}/{schoolYear}")]
    public async Task<IActionResult> GetInterventionsBySearch(int studentId, SchoolYear schoolYear)
    {
        var result = await _interventionRepository.GetBySearchAsync(studentId, schoolYear);

        _ = Parallel.ForEach(result, i =>
        {
            i.EmailCommunication.Attachments.AddRange(_entityBlobService.GetInterventionEmailCommunications(i.Id).Result);
            i.ScheduledMeeting.Attachments.AddRange(_entityBlobService.GetInterventionScheduledMeetings(i.Id).Result);
            i.SuccessPlan.Attachments.AddRange(_entityBlobService.GetInterventionSuccessPlans(i.Id).Result);
            i.TruancyForm.Attachments.AddRange(_entityBlobService.GetInterventionTruancyForms(i.Id).Result);
        });
        return Ok(result);
    }

    [HttpGet("{studentId?}")]
    public async Task<IActionResult> GetStudentsWithInterventions(int? includeStudentId = null)
    {
        var result = await _interventionRepository.GetStudentsWithInterventionsAsync(includeStudentId);
        return Ok(result);
    }

    [HttpGet("{schoolYear}")]
    public async Task<IActionResult> GetInterventionLevelsBySearch(SchoolYear schoolYear, bool? enrollmentStatus = null)
    {
        return Ok(await _interventionRepository.GetLevelsBySearchAsync(schoolYear, enrollmentStatus));
    }

    [HttpGet]
    public async Task<IActionResult> ReturnInterventionEmailTemplates()
    {
        var result = await _interventionEmailTemplateRepository.GetListAsync();
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateInterventionEmailTemplate(InterventionEmailTemplateModel interventionEmailTemplate)
    {
        var result = await _interventionEmailTemplateRepository.UpdateAsync(interventionEmailTemplate);
        return Ok(result);
    }

    [HttpPut("{interventionLevel}")]
    public async Task<IActionResult> UpdateInterventionEmailTemplateAttachment(InterventionLevel interventionLevel, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var result = await _entityBlobService.UploadEmailTemplateAttachment(stream, interventionLevel, file.FileName, file.ContentType);

        return Ok(!string.IsNullOrEmpty(result));
    }

    [HttpPut("{id}/{status}")]
    public async Task<IActionResult> SetInterventionStatus(int id, InterventionStatus status)
    {
        _ = await _interventionRepository.SetStatusAsync(UserContext, id, status);
        var intervention = await _interventionRepository.GetByIdAsync(id);

        // return the updated intervention
        return Ok(intervention);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIntervention(int id)
    {
        var result = await _interventionRepository.DeleteAsync(UserContext, id);
        return Ok(result);
    }

    #region Email Communication
    [HttpGet("{id}")]
    public async Task<IActionResult> ReturnInterventionEmailTemplateByInterventionId(int id)
    {
        var item = await _interventionEmailTemplateRepository.GetByInterventionId(id);
        return Ok(item);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateEmailCommunication(InterventionEmailCommunicationItem item)
    {
        _ = await _interventionEmailCommunicationRepository.UpdateAsync(UserContext, item);
        var intervention = await _interventionRepository.GetByIdAsync(item.InterventionId);
        return Ok(intervention);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UploadEmailCommunicationAttachment(int id, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var url = await _entityBlobService.UploadInterventionEmailCommunication(stream, id, file.FileName, file.ContentType);
        return Json(url);
    }

    [HttpDelete("{id}/{fileName}")]
    public async Task<IActionResult> DeleteEmailCommunicationAttachment(int id, string fileName)
    {
        await _entityBlobService.DeleteInterventionEmailCommunication(id, fileName);
        return Ok();
    }
    #endregion

    #region Scheduled Meeting
    [HttpPut]
    public async Task<IActionResult> UpdateScheduledMeeting(InterventionScheduledMeetingItem item)
    {
        _ = await _interventionScheduledMeetingRepository.UpdateAsync(UserContext, item);

        var intervention = await _interventionRepository.GetByIdAsync(item.InterventionId);
        return Ok(intervention);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UploadScheduledMeetingAttachment(int id, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var url = await _entityBlobService.UploadInterventionScheduledMeeting(stream, id, file.FileName, file.ContentType);
        return Json(url);
    }

    [HttpDelete("{id}/{fileName}")]
    public async Task<IActionResult> DeleteScheduledMeetingAttachment(int id, string fileName)
    {
        await _entityBlobService.DeleteInterventionScheduledMeeting(id, fileName);
        return Ok();
    }
    #endregion

    #region Success Plan
    [HttpPut]
    public async Task<IActionResult> UpdateSuccessPlan(InterventionSuccessPlanItem item)
    {
        _ = await _interventionSuccessPlanRepository.UpdateAsync(UserContext, item);

        var intervention = await _interventionRepository.GetByIdAsync(item.InterventionId);
        return Ok(intervention);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UploadSuccessPlanAttachment(int id, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var url = await _entityBlobService.UploadInterventionSuccessPlan(stream, id, file.FileName, file.ContentType);
        return Json(url);
    }

    [HttpDelete("{id}/{fileName}")]
    public async Task<IActionResult> DeleteSuccessPlanAttachment(int id, string fileName)
    {
        await _entityBlobService.DeleteInterventionSuccessPlan(id, fileName);
        return Ok();
    }
    #endregion

    #region Truancy Form
    [HttpPut]
    public async Task<IActionResult> UpdateTruancyForm(InterventionTruancyFormItem item)
    {
        _ = await _interventionTruancyFormRepository.UpdateAsync(UserContext, item);

        var intervention = await _interventionRepository.GetByIdAsync(item.InterventionId);
        return Ok(intervention);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UploadTruancyFormAttachment(int id, IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var url = await _entityBlobService.UploadInterventionTruancyForm(stream, id, file.FileName, file.ContentType);
        return Json(url);
    }

    [HttpDelete("{id}/{fileName}")]
    public async Task<IActionResult> DeleteTruancyFormAttachment(int id, string fileName)
    {
        await _entityBlobService.DeleteInterventionTruancyForm(id, fileName);
        return Ok();
    }
    #endregion
}
