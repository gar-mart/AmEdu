using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Api.Helpers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;

using Newtonsoft.Json;

using Repository.Infrastructure;
using Repository.Infrastructure.Azure;
using Repository.Repositories.Attendance.ClassUsers;
using Repository.Repositories.Common.Staff;
using Repository.Repositories.Common.Student;
using Repository.Repositories.Common.User;
using Repository.Repositories.Orientation.ElectiveGroups;
using Repository.Repositories.Orientation.Electives;
using Repository.Repositories.Orientation.ElectiveSetting;
using Repository.Repositories.Student.AppTileMetadata;
using Repository.Repositories.Student.StudentInformation;
using Repository.Repositories.Student.StudentResource;

using Shared.Helpers;

using Web.Areas.Account.Hubs;
using Web.Areas.Portal.Models;

namespace Api.Controllers;

[Route("api/{controller}/{action}")]
public class CommonController: ApiControllerBase
{
    private readonly IOptions<AppConfigurations> _appConfigurations;
    private readonly IHubContext<AccountHub, IAccountHub> _accountHubContext;
    private readonly ErrorLogging _errorLogging;
    private readonly MessageQueueService _messageQueueService;
    private readonly IWebHostEnvironment _environment;
    private readonly ClassUserRepository _classUserRepository;
    private readonly StaffRepository _staffRepository;
    private readonly StudentRepository _studentRepository;
    private readonly StudentInformationRepository _studentInformationRepository;
    private readonly StudentResourceRepository _studentResourceRepository;
    private readonly AppTileMetadataRepository _appTileMetadataRepository;
    private readonly UserRepository _userRepository;
    private readonly ElectiveRepository _electiveRepository;
    private readonly ElectiveSettingRepository _electiveSettingRepository;
    private readonly ElectiveGroupRepository _electiveGroupRepository;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public CommonController(
        IOptions<AppConfigurations> appConfigurations,
        IHubContext<AccountHub, IAccountHub> accountHubContext,
        ErrorLogging errorLogging,
        MessageQueueService messageQueueService,
        IWebHostEnvironment environment,
        ClassUserRepository classUserRepository,
        StaffRepository staffRepository,
        StudentRepository studentRepository,
        StudentInformationRepository studentInformationRepository,
        StudentResourceRepository studentResourceRepository,
        AppTileMetadataRepository appTileMetadataRepository,
        UserRepository userRepository,
        ElectiveRepository electiveRepository,
        ElectiveSettingRepository electiveSettingRepository,
        ElectiveGroupRepository electiveGroupRepository,
        IWebHostEnvironment webHostEnvironment)
    {
        _appConfigurations = appConfigurations;
        _accountHubContext = accountHubContext;
        _errorLogging = errorLogging;
        _messageQueueService = messageQueueService;
        _environment = environment;
        _classUserRepository = classUserRepository;
        _staffRepository = staffRepository;
        _studentRepository = studentRepository;
        _studentInformationRepository = studentInformationRepository;
        _studentResourceRepository = studentResourceRepository;
        _appTileMetadataRepository = appTileMetadataRepository;
        _userRepository = userRepository;
        _electiveRepository = electiveRepository;
        _electiveSettingRepository = electiveSettingRepository;
        _electiveGroupRepository = electiveGroupRepository;
        _webHostEnvironment = webHostEnvironment;
    }

    #region HTTP Gets

    [Authorize, HttpGet("{id}")]
    public async Task<IActionResult> ReturnStudentResourceById(int id)
    {
        var result = await _studentResourceRepository.ReturnStudentResourceById(id);
        return Ok(result);
    }

    [Authorize, HttpGet("{id}")]
    public async Task<IActionResult> ReturnAppTileMetadataById(int id)
    {
        var result = await _appTileMetadataRepository.ReturnAppTileMetadataItemById(id);
        return Ok(result);
    }

    [Authorize(Roles = UserRoles.Admin), HttpGet]
    public async Task<IActionResult> ReturnAllStudents()
    {
        var allStudents = await _studentRepository.ReturnAllStudents();
        return Ok(allStudents);
    }

    [Authorize(Roles = UserRoles.Admin), HttpGet]
    public async Task<IActionResult> ReturnAllStaff()
    {
        var allStaff = await _staffRepository.ReturnAllStaff();
        return Ok(allStaff);
    }

    [Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Mentor}")]
    [HttpGet("{mentorId}")]
    public async Task<IActionResult> ReturnStudentsByMentor(int mentorId)
    {
        var studentList = await _studentRepository.ReturnStudentsByMentor(mentorId);
        return Ok(studentList);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> ReturnStudentByID(int studentId)
    {
        if (User.IsInRole(UserRoles.Staff) || UserContext.UserId == studentId)
        {
            var studentList = await _studentRepository.ReturnStudentById(studentId);
            return Ok(studentList);
        }
        return Unauthorized();
    }

    [Authorize(Roles = UserRoles.Staff), HttpGet("{hasMentees?}")]
    public async Task<IActionResult> ReturnMentors(bool? hasMentees)
    {
        var mentors = await _staffRepository.ReturnMentors(hasMentees);
        return Ok(mentors);
    }

    [Authorize, HttpGet("{gradeLevel?}")]
    public async Task<IActionResult> ReturnCounselors(string gradeLevel = null)
    {
        var counselors = await _staffRepository.ReturnCounselors(gradeLevel);
        return Ok(counselors);
    }

    [HttpGet]
    public ActionResult<string> ReturnEnvironment()
    {
        var environment = "";

        if (_environment.EnvironmentName == "Development")
        {
            environment = "Development Data";
        }
        else if (Debugger.IsAttached && _environment.EnvironmentName == "Production")
        {
            environment = "Production Data";
        }

        return environment;
    }

    [HttpGet("{studentId}/{startDate?}/{endDate?}")]
    public async Task<IActionResult> ReturnClassUsersByStudentId(int studentId, DateTime? startDate, DateTime? endDate)
    {
        var (ClassUsers, _, _) = await _classUserRepository.GetByStudentId(studentId, startDate, endDate);
        return Ok(ClassUsers);
    }

    [HttpGet("{id}"), AllowAnonymous]
    public async Task<IActionResult> ReturnProfilePicture(int id)
    {
        var user = await _userRepository.ReturnUserById(id);
        if (string.IsNullOrEmpty(user?.ProfilePicture))
        {
            var defaultImage = Path.Combine(_webHostEnvironment.ContentRootPath, "ClientApp");

            if (Debugger.IsAttached)
            {
                defaultImage = Path.Combine(defaultImage, "src");
            }
            else
            {
                defaultImage = Path.Combine(defaultImage, "dist", "AmEduEnrollmentWeb");
            }

            defaultImage = Path.Combine(defaultImage, "assets", "SelfieOutline.png");

            return File(System.IO.File.ReadAllBytes(defaultImage), "image/png");
        }

        var base64String = user.ProfilePicture.Replace("data:image/jpeg;base64,", string.Empty);

        return File(Convert.FromBase64String(base64String), "image/jpeg");
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ReturnUserById(int id)
    {
        var result = await _userRepository.ReturnUserById(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnStaffBySearch(string searchTerm)
    {
        var result = await _staffRepository.ReturnStaffBySearch(searchTerm);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnElectivesBySearch(string searchTerm)
    {
        var result = await _electiveRepository.ReturnElectivesBySearch(searchTerm);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnElectives()
    {
        var result = await _electiveRepository.GetListAsync();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnElectiveSettings()
    {
        var result = await _electiveSettingRepository.GetListAsync();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnElectiveGroups()
    {
        var result = await _electiveGroupRepository.GetListAsync();
        return Ok(result);
    }

    #endregion

    #region HTTP Posts

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> AssignMentorToStudent([FromBody] StudentMentorDto data)
    {
        var studentId = data.StudentId;
        var mentorId = data.MentorId.Value;

        var mentorAssigned = await _studentRepository.AssignMentorToStudentCRUD(studentId, mentorId);

        await AccountHub.RefreshUsersAsync(_accountHubContext, studentId);
        await AccountHub.RefreshUsersAsync(_accountHubContext, mentorId);

        return Ok(mentorAssigned);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> SetAdmin([FromBody] UserRoleDto data)
    {
        var success = await _userRepository.SetAdmin(data.Id, data.IsAdmin.Value);

        await AccountHub.RefreshUsersAsync(_accountHubContext, data.Id);

        return Ok(success);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> SetTeacher([FromBody] UserRoleDto data)
    {
        var success = await _userRepository.SetTeacher(data.Id, data.IsTeacher.Value);

        await AccountHub.RefreshUsersAsync(_accountHubContext, data.Id);

        return Ok(success);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> SetRefuelCoordinator([FromBody] UserRoleDto data)
    {
        var success = await _userRepository.SetReFuelCoordinator(data.Id, data.IsReFuelCoordinator.Value);

        await AccountHub.RefreshUsersAsync(_accountHubContext, data.Id);

        return Ok(success);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> SetInterventionist([FromBody] UserRoleDto data)
    {
        var success = await _userRepository.SetInterventionist(data.Id, data.IsInterventionist.Value);

        await AccountHub.RefreshUsersAsync(_accountHubContext, data.Id);

        return Ok(success);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> AssignStudentsToMentor([FromBody] StudentsToMentorAssignmentItem data)
    {
        var mentorId = data.MentorId;
        var studentList = data.StudentList;

        var studentsAssignedToMentor = await _studentRepository.AssignStudentsToMentorCRUD(mentorId, studentList);

        await AccountHub.RefreshUsersAsync(_accountHubContext, data.MentorId);

        await Task.WhenAll(studentList.Select(s => AccountHub.RefreshUsersAsync(_accountHubContext, s)));

        return Ok(studentsAssignedToMentor);
    }

    [HttpPost]
    public async Task<IActionResult> SetStudentGradeLevel([FromBody] UserGradeLevelDto data)
    {
        var userId = data.UserId;
        var gradeLevel = data.GradeLevel;

        if (User.IsInRole(UserRoles.Admin) || UserContext.UserId == userId)
        {
            var newMentorId = await _studentRepository.SetStudentGradeLevel(userId, gradeLevel);

            await Task.WhenAll(
                AccountHub.RefreshUsersAsync(_accountHubContext, newMentorId),
                AccountHub.RefreshUsersAsync(_accountHubContext, userId));

            return Ok(newMentorId);
        }
        return Ok(false);
    }

    [HttpPost]
    public async Task<IActionResult> SendMessageToMentor([FromBody] SendMessageToMentorData data)
    {
        var student = data.Student;
        var message = data.Message;
        var bottomMessage = "<br /><br /><br /> <span style='color:#555555;font-size:75%;'>Responding to this email will send a reply to the student.</span>";

        var subject = $"{student.Name} sent you a message!";
        var emailBody = EmailBuilder.BuildHeader($"{student.Name} sent you the following message:");
        emailBody += EmailBuilder.BuildParagraph(message + bottomMessage);

        var body = EmailBuilder.BuildEmail(_appConfigurations.Value, subject, "", emailBody);

        try
        {
            var email = student.MentorEmail;
            if (data.IsSecondaryMentor)
            {
                email = student.SecondaryMentorEmail;
            }

            await _messageQueueService.InsertIntoQueue(subject, body, email, student.Email);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        return Ok(true);
    }

    [HttpPost]
    public IActionResult SendErrorEmail([FromBody] dynamic data)
    {
        var ex = JsonConvert.DeserializeObject<dynamic>(data.ToString());
        string subject = "Error Encountered: " + ex.message;
        subject = subject.Replace('\r', ' ').Replace('\n', ' ');
        var exc = new Exception(ex.message.ToString())
        {
            Source = ex.stackTrace
        };

        if (subject.Length >= 60)
        {
            subject = subject[..60];
        }

        _errorLogging.NotifyDevelopers(exc, subject);
        return Ok(true);
    }

    [Authorize(Roles = UserRoles.Admin), HttpPost]
    public async Task<IActionResult> AssignSecondaryMentorToStudent([FromBody] StudentMentorDto data)
    {
        var studentId = data.StudentId;
        var mentorId = data.MentorId;

        var mentorAssigned = await _studentRepository.AssignSecondaryMentorToStudentCRUD(studentId, mentorId);

        await AccountHub.RefreshUsersAsync(_accountHubContext, studentId);
        await AccountHub.RefreshUsersAsync(_accountHubContext, mentorId);

        return Ok(mentorAssigned);
    }

    [HttpPost, AllowAnonymous]
    public async Task<IActionResult> UnsubscribeFromWeeklySnapshotEmail([FromBody] StudentGoogleIdDto dto)
    {
        var result = await _studentInformationRepository.UnsubscribeFromWeeklySnapshotEmailAsync(dto.StudentGoogleId);
        return Ok(result);
    }
    #endregion

    #region Developer Testing
    [HttpGet, AllowAnonymous]
    public IActionResult TestAppInsights()
    {
        throw new ApplicationException("This is an expected exception. Please ignore this error.");
    }
    #endregion
}
