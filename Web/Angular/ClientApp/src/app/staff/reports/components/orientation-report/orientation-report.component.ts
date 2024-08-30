import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AvatarDialogComponent } from "@design/avatar-dialog/avatar-dialog.component";
import { Student } from "@models/student.model";
import { BroughtToAmEduChoices, broughtToAmEduChoicesOptions } from "app/enums/brought-to-AmEdu-choices.enum";
import { PreferredContactMethod, preferredContactMethodOptions } from "app/enums/preferred-contact-method.enum";
import { PreferredContactTime, preferredContactTimeOptions } from "app/enums/preferred-contact-time.enum";
import { StudentOrientationResponse, StudentSemesterElective } from "app/models";
import { Constants } from "app/shared";
import { environment } from "environments/environment";
import { Subject, Subscription } from "rxjs";
import { ReportsService } from "../../services";

@Component({
  selector: "app-orientation-report",
  templateUrl: "./orientation-report.component.html",
  styleUrls: ["./orientation-report.component.scss"],
})
export class OrientationReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly subscriptions: Subscription[] = [];
  private readonly _componentDestroyed$: Subject<boolean> = new Subject();

  readonly environment = environment;
  readonly BroughtToAmEduChoices = BroughtToAmEduChoices;

  readonly displayedColumns: (
    | keyof StudentOrientationResponse
    | "options"
    | "semester1Electives"
    | "semester2Electives"
  )[] = [
    "options",

    // student columns
    "name",
    "mentorName",
    "gradeLevel",
    "wayToReachAsStudent",
    "studentPhoneNumber",
    "studentEmailAddress",
    "studentBirthday",
    "semester1Electives",
    "semester2Electives",

    // guardian columns
    "guardianRelationship",
    "guardianName",
    "bestTimeToReachAsGuardian",
    "wayToContactAsGuardian",
    "guardianEmailAddress",
    "guardianPhoneNumber",
    "guardianIsSubscribedToWeeklySnapshotEmail",

    // secondary guardian columns
    "secondaryGuardianRelationship",
    "secondaryGuardianName",
    "secondaryGuardianEmailAddress",
    "secondaryGuardianPhoneNumber",

    // address columns
    "homeAddress",
    // these ones are grouped into the homeAddress
    // "city",
    // "state",
    // "zipCode",

    // Q & A columns
    "interests",
    "extraCurricularActivities",
    "notesAboutMe",
    "broughtToAmEduChoices", // also includes broughtToAmEduOther
  ];
  readonly gradeLevels: string[] = Constants.grades;

  private filterValues = { name: "", gradeLevel: "", email: "", elective: "" };

  dataSource = new MatTableDataSource();
  studentSemesterElectives: StudentSemesterElective[];
  semesters: number[] = [];
  nameFilter = new UntypedFormControl();
  electiveFilter = new UntypedFormControl();
  gradeLevelFilter = new UntypedFormControl();
  emailFilter = new UntypedFormControl();
  isExporting = false;

  constructor(private orientationService: ReportsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.orientationService.getOrientationReportData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.studentOrientationResponses);

      let filterTimeout = setTimeout(() => {}, 0);

      this.subscriptions.push(
        this.nameFilter.valueChanges.subscribe(value => {
          this.filterValues["name"] = value;
          clearTimeout(filterTimeout);
          filterTimeout = setTimeout(() => {
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }, 250);
        }),

        this.electiveFilter.valueChanges.subscribe(value => {
          this.filterValues["elective"] = value;
          clearTimeout(filterTimeout);
          filterTimeout = setTimeout(() => {
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }, 250);
        }),

        this.gradeLevelFilter.valueChanges.subscribe(value => {
          this.filterValues["gradeLevel"] = value;
          clearTimeout(filterTimeout);
          filterTimeout = setTimeout(() => {
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }, 150);
        }),

        this.emailFilter.valueChanges.subscribe(value => {
          this.filterValues["email"] = value;
          clearTimeout(filterTimeout);
          filterTimeout = setTimeout(() => {
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }, 150);
        })
      );

      this.studentSemesterElectives = data.studentSemesterElectives;

      // custom filterPredicate function:
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.semesters = this.studentSemesterElectives
        .map(s => s.semesterNumber)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.gradeLevelFilter.patchValue("All");
      this.emailFilter.patchValue("AmEdustudents.org");
    });
  }

  exportToExcel() {
    this.isExporting = true;
    const name = this.nameFilter.value;
    const elective = this.electiveFilter.value;
    const gradeLevel = this.gradeLevelFilter.value;
    const email = this.emailFilter.value;
    this.orientationService.exportOrientationReportExcel(name, elective, gradeLevel, email).subscribe(data => {
      this.isExporting = false;
      const blob = new Blob([data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Orientation Report - .xlsx`;
      link.click();
    });
  }

  ngOnDestroy() {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  filterStudentElectives(studentElectives: StudentSemesterElective[], studentId: number, semesterNumber: number) {
    return studentElectives.filter(se => se.studentId === studentId && se.semesterNumber === semesterNumber);
  }

  customFilterPredicate() {
    const gl = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const electives = this.studentSemesterElectives;
    const filterFunction = function (data: StudentOrientationResponse, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      if (data.gradeLevel === null) {
        data.gradeLevel = "";
      }
      if (searchTerms.gradeLevel === "All") {
        if (searchTerms.email === "All") {
          return (
            data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
            (!searchTerms.elective ||
              electives.some(
                e =>
                  e.studentId === data.studentId &&
                  e.electiveName.toLowerCase().includes(searchTerms.elective.toLowerCase())
              )) &&
            (data.gradeLevel === "" || gl.includes(data.gradeLevel)) &&
            (data.studentEmail.toLowerCase().includes("AmEdustudents.org") ||
              data.studentEmail.toLowerCase().includes("innocademystudents.com"))
          );
        } else {
          return (
            data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
            (!searchTerms.elective ||
              electives.some(
                e =>
                  e.studentId === data.studentId &&
                  e.electiveName.toLowerCase().includes(searchTerms.elective.toLowerCase())
              )) &&
            (data.gradeLevel === "" || gl.includes(data.gradeLevel)) &&
            data.studentEmail.toLowerCase().includes(searchTerms.email.toLowerCase())
          );
        }
      } else {
        if (searchTerms.email === "All") {
          return (
            data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
            data.gradeLevel === searchTerms.gradeLevel &&
            (!searchTerms.elective ||
              electives.some(
                e =>
                  e.studentId === data.studentId &&
                  e.electiveName.toLowerCase().includes(searchTerms.elective.toLowerCase())
              )) &&
            (data.studentEmail.toLowerCase().includes("AmEdustudents.org") ||
              data.studentEmail.toLowerCase().includes("innocademystudents.com"))
          );
        } else {
          return (
            data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
            data.gradeLevel === searchTerms.gradeLevel &&
            data.studentEmail.toLowerCase().includes(searchTerms.email.toLowerCase()) &&
            (!searchTerms.elective ||
              electives.some(
                e =>
                  e.studentId === data.studentId &&
                  e.electiveName.toLowerCase().includes(searchTerms.elective.toLowerCase())
              ))
          );
        }
      }
    };
    return filterFunction;
  }

  openStudentAvatarDialog(student: Student) {
    this.dialog.open(AvatarDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student: student,
      },
    });
  }

  getBroughtToAmEduChoices(item: StudentOrientationResponse) {
    return broughtToAmEduChoicesOptions
      .filter(o => o.value === (o.value & item.broughtToAmEduChoices) && o.value !== BroughtToAmEduChoices.Other)
      .map(choice => choice.label);
  }

  getBroughtToAmEduOther(item: StudentOrientationResponse) {
    if (
      item.broughtToAmEduOther &&
      BroughtToAmEduChoices.Other === (item.broughtToAmEduChoices & BroughtToAmEduChoices.Other)
    ) {
      return item.broughtToAmEduOther;
    }
    return null;
  }

  getPreferredContactMethod(value: PreferredContactMethod) {
    return preferredContactMethodOptions.get(value);
  }

  getPreferredContactTime(value: PreferredContactTime) {
    return preferredContactTimeOptions.get(value);
  }
}
