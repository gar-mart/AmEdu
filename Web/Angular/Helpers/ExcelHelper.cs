//using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

using Api.Models;

using ClosedXML.Excel;

using FD.Base.Shared.Extensions;

using Repository.Repositories.Attendance.Enrollments;
using Repository.Repositories.Orientation.ConnectionSurveyStep;
using Repository.Repositories.Orientation.OrientationReport;

using Shared.Buzz.Schemas;

namespace Api.Helpers;

public static class ExcelHelper
{
    public static XLWorkbook EngagementReport(EngagementReportPdfModel model)
    {
        var item = model.EngagementReportItem;
        var classes = model.ClassUserModels;
        var workbook = new XLWorkbook();
        var workSheet = workbook.Worksheets.Add("Features");


        var currentRow = workSheet.FirstRow();

        var lastCell = currentRow.FirstCell().SetValue($"Engagement Report Export ({model.StartDate:d}-{model.EndDate:d})");


        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
           .Font.SetBold();


        currentRow = currentRow.RowBelow();
        lastCell = currentRow.FirstCell().SetValue($"{item.Name}");

        currentRow = currentRow.RowBelow();
        currentRow = currentRow.RowBelow();

        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
           .Font.SetBold();

        lastCell = currentRow
               .FirstCell().SetValue("Live Lessons")
               .CellRight().SetValue("Communications")
               .CellRight().SetValue("Online Time")
               .CellRight().SetValue("Classes Failing")
               .CellRight().SetValue("Enrollment Status");

        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
            .Font.SetBold();

        currentRow = currentRow.RowBelow();
        _ = currentRow
                    .FirstCell().SetValue($"{item.LiveLessonPoints} out of {item.LiveLessonsOffered}")
                    .CellRight().SetValue(item.CommunicationPoints)
                    .CellRight().SetValue(FormatHelper.ToTimeFormat(item.OnlineHoursSpent * 60 * 60)) // convert to seconds
                    .CellRight().SetValue(item.FailingGrades)
                    .CellRight().SetValue(item.IsActive ? "Active" : "Inactive");
        _ = currentRow.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Font.SetBold(false);

        currentRow = currentRow.RowBelow();

        currentRow = currentRow.RowBelow();

        lastCell = currentRow.FirstCell().SetValue("Performance Snapshot");
        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
            .Font.SetBold();


        currentRow = currentRow.RowBelow();

        lastCell = currentRow
               .FirstCell().SetValue("Class")
               .CellRight().SetValue("Live Lessons (Selected Date Range)")
               .CellRight().SetValue("Time Spent (Selected Date Range)")
               .CellRight().SetValue("Time Spent (All Time)")
               .CellRight().SetValue("Score")
               .CellRight().SetValue("Enrollment Status (current)");
        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
            .Font.SetBold();

        currentRow = currentRow.RowBelow();
        foreach (var c in classes)
        {
            _ = currentRow
                .FirstCell().SetValue(c.ClassName)
                .CellRight().SetValue($"{c.LiveLessonPoints} out of {c.LiveLessonsOffered}")
                .CellRight().SetValue(FormatHelper.ToTimeFormat(c.OnlineHoursSpentThisWeek * 60 * 60)) // convert to seconds
                .CellRight().SetValue(FormatHelper.ToTimeFormat(c.TotalSecondsSpentOnline))
                .CellRight().SetValue(c.Score)
                .CellRight().SetValue(c.Status == EnrollmentStatus.CompletedNoCredit ? "Completed - No Credit" :



            c.Status == EnrollmentStatus.WithdrawnFailed
                ? "Widthdrawn Failed"
                : c.Status.ToString());
            _ = currentRow.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            _ = currentRow.FirstCell().Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            currentRow = currentRow.RowBelow();

        }

        _ = workSheet.Columns(1, 6).AdjustToContents();

        var tempPath = Path.GetTempPath();
        workbook.SaveAs(tempPath + "engagementReport.xlsx");
        return workbook;
    }


    public static XLWorkbook OrientationReport(OrientationReportItem model)
    {
        var workbook = new XLWorkbook();
        var workSheet = workbook.Worksheets.Add("Attendance Report");
        var currentRow = workSheet.FirstRow();

        // write out the header
        var lastCell = currentRow
            .FirstCell().SetValue("Student")
            .CellRight().SetValue("Mentor Name")
            .CellRight().SetValue("Grade Level")
            .CellRight().SetValue("Student Preferred Contact Method")
            .CellRight().SetValue("Student Phone Number")
            .CellRight().SetValue("Student Email")
            .CellRight().SetValue("Student Birthday")
            .CellRight().SetValue("Semester 1 Electives")
            .CellRight().SetValue("Semester 2 Electives")

            .CellRight().SetValue("Guardian Relationship")
            .CellRight().SetValue("Guardian Name")
            .CellRight().SetValue("Guardian Preferred Contact Time")
            .CellRight().SetValue("Guardian Preferred Contact Method")
            .CellRight().SetValue("Guardian Email")
            .CellRight().SetValue("Guardian Phone Number")
            .CellRight().SetValue("Guardian Subscription Status")

            .CellRight().SetValue("Secondary Guardian Relationship")
            .CellRight().SetValue("Secondary Guardian Name")
            .CellRight().SetValue("Secondary Guardian Email")
            .CellRight().SetValue("Secondary Guardian Phone Number")

            .CellRight().SetValue("Home Address")

            .CellRight().SetValue("Interests")
            .CellRight().SetValue("Extra Curricular Activities")
            .CellRight().SetValue("Notes About Me")
            .CellRight().SetValue("What brought you to AmEdu?")
            .CellRight().SetValue("Other (What brought you to AmEdu?)");

        _ = workSheet.Range(currentRow.FirstCell(), lastCell).Style
          .Font.SetBold();

        currentRow = currentRow.RowBelow();

        foreach (var response in model.StudentOrientationResponses)
        {
            var semester1Electives = model.StudentSemesterElectives
                .Where(x => x.SemesterNumber == 1 && x.StudentId == response.StudentId)
                .Select(x => x.ElectiveName);
            var semester2Electives = model.StudentSemesterElectives
                .Where(x => x.SemesterNumber == 2 && x.StudentId == response.StudentId)
                .Select(x => x.ElectiveName);
            lastCell = currentRow
               .FirstCell().SetValue(response.Name)
               .CellRight().SetValue(response.MentorName)
               .CellRight().SetValue(response.GradeLevel)
               .CellRight().SetValue(response.WayToReachAsStudent == 0 ? string.Empty : response.WayToReachAsStudent.GetDisplayName())
               .CellRight().SetValue(response.StudentPhoneNumber)
               .CellRight().SetValue(response.StudentEmailAddress)
               .CellRight().SetValue(response.StudentBirthday?.ToShortDateString())
               .CellRight().SetValue(string.Join(", ", semester1Electives))
               .CellRight().SetValue(string.Join(", ", semester2Electives))

               .CellRight().SetValue(response.GuardianRelationship)
               .CellRight().SetValue(response.GuardianName)
               .CellRight().SetValue(response.BestTimeToReachAsGuardian == 0 ? string.Empty : response.BestTimeToReachAsGuardian.GetDisplayName())
               .CellRight().SetValue(response.WayToContactAsGuardian == 0 ? string.Empty : response.WayToContactAsGuardian.GetDisplayName())
               .CellRight().SetValue(response.GuardianEmailAddress)
               .CellRight().SetValue(response.GuardianPhoneNumber)
               .CellRight().SetValue(response.GuardianIsSubscribedToWeeklySnapshotEmail ? "Subscribed to weekly snapshot" : "-")

               .CellRight().SetValue(response.SecondaryGuardianRelationship)
               .CellRight().SetValue(response.SecondaryGuardianName)
               .CellRight().SetValue(response.SecondaryGuardianEmailAddress)
               .CellRight().SetValue(response.SecondaryGuardianPhoneNumber)

               .CellRight().SetValue(string.Join(", ", new List<string>
               {
                   response.HomeAddress,
                   response.City,
                   $"{response.State}  {response.ZipCode}".Trim(),
               }.Where(r => !string.IsNullOrEmpty(r))))

               .CellRight().SetValue(response.Interests)
               .CellRight().SetValue(response.ExtraCurricularActivities)
               .CellRight().SetValue(response.NotesAboutMe)
               .CellRight().SetValue(string.Join(", ", WhatBroughtYouToAmEduText(response)))
               .CellRight().SetValue((response.BroughtToAmEduChoices & BroughtToAmEduChoices.Other) == BroughtToAmEduChoices.Other ? response.BroughtToAmEduOther : string.Empty)
               ;
            currentRow = currentRow.RowBelow();
        }
        _ = workSheet.Columns(1, 50).AdjustToContents();

        return workbook;

        static IEnumerable<string> WhatBroughtYouToAmEduText(StudentOrientationResponseItem response)
        {
            foreach (BroughtToAmEduChoices value in Enum.GetValues(typeof(BroughtToAmEduChoices)))
            {
                if ((value & response.BroughtToAmEduChoices) == value)
                {
                    yield return value.GetDisplayName();
                }
            }
        }
    }

    public static XLWorkbook AttendanceReport(IEnumerable<EnrollmentModel> enrollments)
    {
        var workbook = new XLWorkbook();
        var workSheet = workbook.Worksheets.Add("Attendance Report");
        var currentRow = workSheet.FirstRow();

        // write out the header
        var currentCell = currentRow
            .FirstCell().SetValue("FirstName")
            .CellRight().SetValue("LastName")
            .CellRight().SetValue("StudentUIC")
            .CellRight().SetValue("DaysAttended")
            .CellRight().SetValue("DaysPossible")
            .CellRight().SetValue("Enrolled Date")
            .CellRight().SetValue("Unenrolled Date");

        foreach (var sampleDataRecord in enrollments.First().Data)
        {
            currentCell = currentCell.CellRight().SetValue($"{sampleDataRecord.StartDate:d} - {sampleDataRecord.EndDate:d}");
        }

        // write out the enrollment data
        foreach (var enrollment in enrollments)
        {
            currentRow = currentRow.RowBelow();
            currentCell = currentRow
                .FirstCell().SetValue(enrollment.FirstName) // FirstName
                .CellRight().SetValue(enrollment.LastName)  // LastName
                .CellRight();

            // force excel to keep the number format as text even after a user touches the cell
            currentCell.Style.NumberFormat.Format = "@";

            currentCell = currentCell.SetValue(enrollment.UICNumber?.ToString("D10")) // StudentUIC
                .CellRight().SetValue(enrollment.Data.Sum(d => d.PointsAwarded ?? 0)) // DaysAttended
                .CellRight().SetValue(enrollment.Data.Where(d => d.PointsPossible.HasValue).Sum(d => d.PointsPossible)) // DaysPossible
                .CellRight().SetValue(enrollment.EnrollmentDate.Value.ToString("d")) // Enrolled Date
                .CellRight().SetValue(enrollment.UnenrollmentDate?.ToString("d")); // Unenrolled Date

            foreach (var data in enrollment.Data)
            {
                currentCell = currentCell.CellRight().SetValue(data.PointsAwarded);
            }
        }

        return workbook;
    }
}
