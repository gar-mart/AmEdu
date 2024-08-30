using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Api.Helpers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Infrastructure.Azure;
using Repository.Repositories.Common.Staff;
using Repository.Repositories.Common.Student;
using Repository.Repositories.Common.User;
using Repository.Repositories.Orientation;
using Repository.Repositories.Orientation.ConnectionSurveyStep;
using Repository.Repositories.Orientation.OrientationReport;

using Shared.Helpers;

using Web.Areas.Portal.Models;

namespace Api.Controllers;

[Route("api/{controller}/{action}")]
public class OrientationController: ApiControllerBase
{
    private readonly MessageQueueService _messageQueueService;
    private readonly AppConfigurations _appConfigurations;
    private readonly StepRepository _stepRepository;
    private readonly StepContentRepository _stepContentRepository;
    private readonly StudentRepository _studentRepository;
    private readonly UserRepository _userRepository;
    private readonly StepsByStudentRepository _stepsByStudentRepository;
    private readonly ConnectionSurveyStepRepository _connectionSurveyStepRepository;
    private readonly GeneralOrientationRepository _generalOrientationRepository;
    private readonly UserQuizAnswersRepository _userQuizAnswersRepository;
    private readonly SemesterElectiveRepository _semesterElectiveRepository;
    private readonly IntroStepRepository _introStepRepository;
    private readonly OrientationReportRepository _orientationReportRepository;
    private readonly SendUsASelfieStepRepository _sendUsASelfieStepRepository;
    private readonly QuestionAnswerRepository _questionAnswerRepository;
    private readonly EmailVerificationStepRepository _emailVerificationStepRepository;
    private readonly CommunityPassportFormRepository _communityPassportFormRepository;
    private readonly StaffRepository _staffRepository;
    private readonly UserElectiveStepRepository _userElectiveStepRepository;

    public OrientationController(
        MessageQueueService messageQueueService,
        IOptions<AppConfigurations> appConfigurations,
        StepRepository stepRepository,
        StepContentRepository stepContentRepository,
        StudentRepository studentRepository,
        UserRepository userRepository,
        StepsByStudentRepository stepsByStudentRepository,
        ConnectionSurveyStepRepository connectionSurveyStepRepository,
        GeneralOrientationRepository generalOrientationRepository,
        UserQuizAnswersRepository userQuizAnswersRepository,
        SemesterElectiveRepository semesterElectiveRepository,
        IntroStepRepository introStepRepository,
        OrientationReportRepository orientationReportRepository,
        SendUsASelfieStepRepository sendUsASelfieStepRepository,
        QuestionAnswerRepository questionAnswerRepository,
        EmailVerificationStepRepository emailVerificationStepRepository,
        CommunityPassportFormRepository communityPassportFormRepository,
        StaffRepository staffRepository,
        UserElectiveStepRepository userElectiveStepRepository)
    {
        _messageQueueService = messageQueueService;
        _appConfigurations = appConfigurations.Value;
        _stepRepository = stepRepository;
        _stepContentRepository = stepContentRepository;
        _studentRepository = studentRepository;
        _userRepository = userRepository;
        _stepsByStudentRepository = stepsByStudentRepository;
        _connectionSurveyStepRepository = connectionSurveyStepRepository;
        _generalOrientationRepository = generalOrientationRepository;
        _userQuizAnswersRepository = userQuizAnswersRepository;
        _semesterElectiveRepository = semesterElectiveRepository;
        _introStepRepository = introStepRepository;
        _orientationReportRepository = orientationReportRepository;
        _sendUsASelfieStepRepository = sendUsASelfieStepRepository;
        _questionAnswerRepository = questionAnswerRepository;
        _emailVerificationStepRepository = emailVerificationStepRepository;
        _communityPassportFormRepository = communityPassportFormRepository;
        _staffRepository = staffRepository;
        _userElectiveStepRepository = userElectiveStepRepository;
    }

    #region HTTP Gets

    [HttpGet("{userId}/{date}")]
    public async Task<IActionResult> ReturnStepsByStudent(int userId, DateTime date)
    {
        var studentStepsAndProgress = await _stepsByStudentRepository.ReturnStepsByStudent(userId, date);
        return Ok(studentStepsAndProgress);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> ReturnStepIntro(int userId)
    {
        var intro = await _introStepRepository.GetByIdAsync(userId);
        return Ok(intro);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> ReturnStepConnectionSurveyData(int userId)
    {
        var stepConnectionSurveyData = await _connectionSurveyStepRepository.ReturnStepConnectionSurvey(userId);
        return Ok(stepConnectionSurveyData);
    }

    [HttpGet("{userId}/{stepId}")]
    public async Task<IActionResult> ReturnUserQuizAnswers(int userId, int stepId)
    {
        var userQuizAnswers = await _userQuizAnswersRepository.ReturnUserQuizAnswers(userId, stepId);
        return Ok(userQuizAnswers);
    }

    [HttpGet("{userId}/{semester}/{schoolYear}")]
    public async Task<IActionResult> ReturnElectives(int userId, int semester, int schoolYear)
    {
        var result = await _semesterElectiveRepository.ReturnUserElective(userId, semester, schoolYear);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnOrientationReportData()
    {
        var orientationReportData = await _orientationReportRepository.ReturnOrientationReport();
        return Ok(orientationReportData);
    }

    [HttpGet("{grade}/{email}/{student?}/{elective?}")]
    public async Task<ActionResult<OrientationReportItem>> ExportOrientationReportExcel(string grade, string email, string student, string elective)
    {
        var grades = grade.Split(",");
        var orientationReportData = await _orientationReportRepository.ReturnOrientationReport();
        orientationReportData.StudentOrientationResponses = orientationReportData.StudentOrientationResponses.Where(x =>
         (grades.Contains("All") || grades.Contains(x.GradeLevel)) &&
            (email == "All" || x.StudentEmail.ToLower().Contains(email.ToLower())) &&
             (student == null || x.Name.ToLower().Contains(student.ToLower())) &&
             (elective == null || orientationReportData.StudentSemesterElectives.Where(y =>
               x.StudentId == y.StudentId && y.ElectiveName.ToLower().Contains(elective.ToLower())).Any())
           ).ToList();
        var workbook = ExcelHelper.OrientationReport(orientationReportData);
        using var stream = new MemoryStream();
        workbook.SaveAs(stream);

        return File(stream.ToArray(), ContentTypes.Xlsx, $"Orientation Report.xlsx");
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> ReturnStepSendUsASelfieData(int userId)
    {
        var stepSendUsASelfieData = await _sendUsASelfieStepRepository.ReturnStepSendUsASelfie(userId);
        return Ok(stepSendUsASelfieData);
    }

    [HttpGet("{studentId}/{signatureContentId}")]
    public async Task<IActionResult> ReturnStudentSignatureContent(int studentId, int signatureContentId)
    {
        var result = await _stepContentRepository.GetStudentSignatureContentAsync(studentId, signatureContentId);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> ReturnCommunityPassportForms()
    {
        var result = await _communityPassportFormRepository.GetListAsync();
        return Ok(result);
    }

    [HttpGet("{gradeLevel}")]
    public async Task<IActionResult> ReturnCommunityPassportFormByGradeLevel(string gradeLevel)
    {
        var result = await _communityPassportFormRepository.GetByGradeLevelAsync(gradeLevel);
        return Ok(result);
    }
    #endregion

    #region HTTP Posts

    [HttpPost]
    public async Task<IActionResult> CompleteStep([FromBody] UserStepDto data)
    {
        var userId = data.UserId;
        var stepId = data.StepId;
        var studentStateBeforeCompletion = await _studentRepository.ReturnStudentById(userId);  // this needs to happen before CompleteStepCRUD procedure
        var nextStep = await _stepsByStudentRepository.CompleteStepCrud(userId, stepId);

        if (nextStep == null && studentStateBeforeCompletion.CompletedSteps != studentStateBeforeCompletion.TotalSteps && !User.IsInRole(UserRoles.Staff))
        {
            var subject = $"{studentStateBeforeCompletion.Name} has completed all the steps in their orientation";
            var emailBody = EmailBuilder.BuildHeader(subject);
            var content = $"<a href='{_appConfigurations.PortalUrl}/student/orientation?studentId={userId}'>View their orientation</a>";

            emailBody += EmailBuilder.BuildParagraph(content);
            var body = EmailBuilder.BuildEmail(_appConfigurations, subject, "", emailBody);

            var counselors = await _staffRepository.ReturnCounselors(studentStateBeforeCompletion.GradeLevel);

            var tos = _appConfigurations.EmailNotifications.OrientationComplete
                    .Append(studentStateBeforeCompletion.MentorEmail)
                    .Concat(counselors.Select(c => c.Email))
                    .Distinct();

            await _messageQueueService.InsertIntoQueue(subject, body, tos);
        }

        return Ok(nextStep);
    }

    [HttpPost]
    public async Task<IActionResult> Submit_ConnectionSurveyStep([FromBody] ConnectionSurveyStepItem data)
    {
        var submitted = await _connectionSurveyStepRepository.Step_ConnectionSurvey_Submit(data);
        return Ok(submitted);
    }

    [HttpPost("{userId}")]
    public async Task<IActionResult> StartOrientation(int userId)
    {
        var stepSkipped = await _generalOrientationRepository.StartOrientationAsync(userId);
        return Ok(stepSkipped);
    }

    [HttpPost]
    public async Task<IActionResult> Submit_UserAnswers([FromBody] UserAnswersItem data)
    {
        var submitted = await _questionAnswerRepository.SubmitUserAnswers(data.UserId, data.UserQuestionsAndAnswers);
        return Ok(submitted);
    }

    [HttpPost("{userId}")]
    public async Task<IActionResult> Step_EmailVerification_ReturnCode(int userId)
    {
        var verificationCode = await _emailVerificationStepRepository.Step_EmailVerification_ReturnCode(userId);

        await HandleVerificationCodeEmail(userId, verificationCode);
        return Ok(verificationCode);
    }

    [HttpPost]
    public async Task<IActionResult> Step_EmailVerification_VerifyCode([FromBody] VerifyCodeDto data)
    {
        var userId = data.UserId;
        var verificationCode = data.VerificationCode;
        var isCodeCorrect = data.CodeIsCorrect;
        var verificationItem = new EmailVerificationStepItem
        {
            CodeIsCorrect = isCodeCorrect,
            VerificationCode = verificationCode
        };

        var isVerificationCodeCorrect = await _emailVerificationStepRepository.Step_EmailVerification_VerifyCode(userId, verificationItem);
        return Ok(isVerificationCodeCorrect);
    }

    [HttpPost]
    public async Task<IActionResult> Submit_UserElectivesStep([FromBody] UserElectivesStepItem data)
    {
        var submitted = await _userElectiveStepRepository.Step_UserElectives_Submit(data.UserId, data.ElectiveList);
        return Ok(submitted);
    }

    [HttpPost]
    public async Task<IActionResult> Submit_SendUsASelfieStep([FromBody] SendUsASelfieStepItem data)
    {
        var submitted = await _sendUsASelfieStepRepository.Step_SendUsASelfie_Submit(data);
        return Ok(submitted);
    }

    [HttpPost]
    public async Task<IActionResult> UpdateStudentSignatureContent([FromBody] StudentSignatureContentItem data)
    {
        var submitted = await _stepContentRepository.UpdateStudentSignatureContentAsync(data);
        return Ok(submitted);
    }
    #endregion

    #region Manage Orientation

    [HttpGet]
    public async Task<IActionResult> ReturnSteps()
    {
        var result = await _stepRepository.GetListAsync();
        return Ok(result);
    }

    [HttpPost("{id}"), Authorize(Roles = UserRoles.Staff)]
    public async Task<IActionResult> DuplicateStep(int id)
    {
        var result = await _stepRepository.DuplicateAsync(id);
        return Ok(result);
    }

    [HttpPost, Authorize(Roles = UserRoles.Staff)]
    public async Task<IActionResult> CreateStep(StepModel step)
    {
        var result = await _stepRepository.CreateAsync(step);
        return Ok(result);
    }

    [HttpPut, Authorize(Roles = UserRoles.Staff)]
    public async Task<IActionResult> UpdateStep(StepModel step)
    {
        var result = await _stepRepository.UpdateAsync(step);
        return Ok(result);
    }

    [HttpPut, Authorize(Roles = UserRoles.Staff)]
    public async Task<IActionResult> UpdateStepOrder(IEnumerable<StepModel> steps)
    {
        var result = await _stepRepository.UpdateOrderAsync(steps);
        return Ok(result);
    }

    [HttpDelete("{id}"), Authorize(Roles = UserRoles.Staff)]
    public async Task<IActionResult> DeleteStep(int id)
    {
        var result = await _stepRepository.DeleteAsync(id);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ReturnStepContent(int id)
    {
        var result = await _stepContentRepository.GetListAsync(id);
        return Ok(result);
    }

    [HttpGet("{id}/{userId?}")]
    public async Task<IActionResult> ReturnQuizContent(int id, int? userId = null)
    {
        var result = await _stepContentRepository.GetQuizContentByIdAsync(id, userId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> ResetStudentOrientation()
    {
        var result = await _generalOrientationRepository.ResetStudentOrientation(UserContext.UserId);
        return Ok(result);
    }
    #endregion

    #region Helpers

    private async Task HandleVerificationCodeEmail(int userId, string verificationCode)
    {
        var student = await _userRepository.ReturnUserById(userId);
        var subject = $"AmEdu Orientation Verification Code for {student.FirstName} {student.LastName}";
        var emailBody = EmailBuilder.BuildHeader(subject);
        var content = $"Your code is {verificationCode}. Please visit the <a href='{_appConfigurations.PortalUrl}/student/orientation/office365part3/27'>Orientation Portal</a> and input your code in the verification box. Thank you.";

        emailBody += EmailBuilder.BuildParagraph(content);
        var body = EmailBuilder.BuildEmail(_appConfigurations, subject, "", emailBody);

        await _messageQueueService.InsertIntoQueue(subject, body, student.UserName);
    }

    #endregion
}
