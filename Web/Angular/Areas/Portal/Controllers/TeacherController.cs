using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Repository.Infrastructure;
using Repository.Repositories.Attendance.Absences;
using Repository.Repositories.Attendance.Classes;
using Repository.Repositories.Attendance.ClassUsers;
using Repository.Repositories.Attendance.LiveLessonPoints;
using Repository.Repositories.Attendance.Tardiness;

namespace Api.Controllers;

[Route("api/{controller}/{action}"), Authorize(Roles = UserRoles.Staff)]
public class TeacherController: ApiControllerBase
{
    private readonly ClassRepository _classRepository;
    private readonly ClassUserRepository _classUserRepository;
    private readonly LiveLessonPointsRepository _liveLessonPointsRepository;
    private readonly TardinessRepository _tardinessRepository;
    private readonly AbsenceRepository _absenceRepository;

    public TeacherController(
        ClassRepository classRepository,
        ClassUserRepository classUserRepository,
        LiveLessonPointsRepository liveLessonPointsRepository,
        TardinessRepository tardinessRepository,
        AbsenceRepository absenceRepository)
    {
        _classRepository = classRepository;
        _classUserRepository = classUserRepository;
        _liveLessonPointsRepository = liveLessonPointsRepository;
        _tardinessRepository = tardinessRepository;
        _absenceRepository = absenceRepository;
    }

    #region Gets
    [HttpGet("{date}")]
    public async Task<IActionResult> ReturnClasses(DateTime date, string searchTerm)
    {
        var result = await _classRepository.GetListAsync(date, searchTerm, UserContext.UserId);
        return Ok(result);
    }

    [HttpGet("{classId}/{date}")]
    public async Task<IActionResult> ReturnClassUsers(int classId, DateTime date)
    {
        var result = await _classUserRepository.GetListAsync(classId, date);
        return Ok(result);
    }

    [HttpGet("{studentId}/{startDate}/{endDate}")]
    public async Task<IActionResult> ReturnAbsences(int studentId, DateTime startDate, DateTime endDate)
    {
        var result = await _absenceRepository.GetListAsync(studentId, startDate, endDate);
        return Ok(result);
    }
    #endregion

    #region Puts
    [HttpPut]
    public async Task<IActionResult> UpdateLiveLessonPoints(LiveLessonPointsModel item)
    {
        item.Date = UserContext.ToUsersTime(item.Date);
        item.StaffId = UserContext.UserId;
        var result = await _liveLessonPointsRepository.UpdateAsync(item, UserContext.CurrentDateTime);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateTardiness(TardinessItem item)
    {
        item.Date = UserContext.ToUsersTime(item.Date);
        item.StaffId = UserContext.UserId;
        var result = await _tardinessRepository.UpdateAsync(item, UserContext.CurrentDateTime);
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAbsence(AbsenceItem item)
    {
        item.StartDate = UserContext.ToUsersTime(item.StartDate);
        item.EndDate = UserContext.ToUsersTime(item.EndDate);
        if (item.Id == 0)
        {
            var createResult = await _absenceRepository.CreateAsync(item, UserContext.UserId, UserContext.CurrentDateTime);
            return Ok(createResult);
        }
        else
        {
            var result = await _absenceRepository.UpdateAsync(item, UserContext.UserId, UserContext.CurrentDateTime);
            return Ok(result);
        }
    }
    #endregion

    #region Deletes
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAbsence(int id)
    {
        var result = await _absenceRepository.DeleteAsync(id);
        return Ok(result);
    }
    #endregion
}
