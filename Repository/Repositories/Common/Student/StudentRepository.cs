using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Common.Student;

public class StudentRepository: BaseAppRepository<StudentItem>
{
    public StudentRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<StudentRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<StudentItem> ReturnStudentById(int userId, bool lastWeekTotals = false)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnStudentById")
            .AddModel(new { userId, lastWeekTotals })
            .QuerySingleAsync<StudentItem>();
    }

    public async Task<List<StudentItem>> ReturnAllStudents()
    {
        var students = new List<StudentItem>();
        var queryResult = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnAllStudents")
            .QueryListAsync<StudentItem>();

        foreach (var student in queryResult)
        {
            student.ProgressPercent = Math.Round(student.ProgressPercent * 100, 2);
            students.Add(student);
        }

        return students;
    }

    public async Task<List<StudentItem>> ReturnStudentsByMentor(int mentorId)
    {
        var students = new List<StudentItem>();
        var result = await CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ReturnMentorStudents")
            .AddModel(new { mentorId })
            .QueryListAsync<StudentItem>();

        foreach (var student in result)
        {
            student.ProgressPercent = Math.Round(student.ProgressPercent * 100, 2);
            if (student.OrientationStartTime != null)
            {
                student.OrientationStartTime = DateTime.SpecifyKind((DateTime)student.OrientationStartTime, DateTimeKind.Utc);
            }

            if (student.OrientationFinishTime != null)
            {
                student.OrientationFinishTime = DateTime.SpecifyKind((DateTime)student.OrientationFinishTime, DateTimeKind.Utc);
            }

            students.Add(student);
        }

        return students;
    }

    public Task<int> SetStudentGradeLevel(int userId, string gradeLevel)
    {
        const string mentorId = "mentorId";
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.SetStudentGrade")
            .AddModel(new { userId, gradeLevel })
            .AddOutput(mentorId, System.Data.DbType.Int32)
            .CoreExecuteAsync()
            .Then(query => query.Get<int>(mentorId));
    }

    public Task<bool> ElevateStudentGradeLevel()
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.ElevateStudentsGrade")
            .ExecuteCommonAsync();
    }

    public Task<bool> AssignMentorToStudentCRUD(int studentId, int mentorId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.AssignMentorToStudent")
            .AddModel(new { studentId, mentorId })
            .ExecuteCommonAsync();
    }

    public Task<bool> AssignStudentsToMentorCRUD(int mentorId, List<int> studentIds)
    {
        var studentList = studentIds.Select(id => new { id }).CreateDataTable();
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.AssignStudentsToMentor")
            .AddModel(new { mentorId, studentList })
            .ExecuteCommonAsync();

    }

    public Task<bool> AssignSecondaryMentorToStudentCRUD(int studentId, int? mentorId)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.AssignSecondaryMentorToStudent")
            .AddModel(new { studentId, mentorId })
            .ExecuteCommonAsync();
    }

    public Task<bool> UpdateEnrollmentDate(int studentId, DateTime? enrollmentDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.UpdateEnrollmentDate")
            .AddModel(new { studentId, enrollmentDate })
            .ExecuteCommonAsync();
    }

    public Task<bool> UpdateUnenrollmentDate(int studentId, DateTime? unenrollmentDate)
    {
        return CommandBuilder
            .CoreBuilder()
            .ForStoredProcedure("Common.UpdateUnenrollmentDate")
            .AddModel(new { studentId, unenrollmentDate })
            .ExecuteCommonAsync();
    }
}
