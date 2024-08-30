import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { StudentService } from "@student/services";
import { AppComponent } from "app/app.component";
import { AvatarDialogComponent, ConfirmationDialogComponent } from "app/design";
import { CommunicationType, PointsType, Trend } from "app/enums";
import { InterventionLevel } from "app/enums/intervention-level.enum";
import {
  ClassUser,
  Communication,
  EngagementFlag,
  Points,
  Student,
  StudentInformation,
  StudentSearchInformation,
} from "app/models";
import { CommonService } from "app/services";
import { Constants, Utility } from "app/shared";
import { environment } from "environments/environment";
import { Datasource, IDatasource } from "ngx-ui-scroll";
import { Subscription } from "rxjs";
import { filter, finalize, tap } from "rxjs/operators";
import { EnrollmentStatus } from "../../../enums/enrollment-status.enum";
import { Absence } from "../../../models/absence";
import { StaffService } from "../../services";
import { TeacherService } from "../../teacher";
import { AwardPointDialogComponent } from "../award-point-dialog/award-point-dialog.component";
import { AbsenceDialogComponent } from "./absence-dialog/absence-dialog.component";
import { CashOutPointsDialogComponent } from "./cash-out-points-dialog/cash-out-points-dialog.component";
import { CommunicationDialogComponent } from "./communication-dialog/communication-dialog.component";
import { GenerateInterventionDialogComponent } from "./generate-intervention-dialog/generate-intervention-dialog.component";
import { InterventionDetailsDialogComponent } from "./intervention-details-dialog/intervention-details-dialog.component";
import { RejectEngagementFlagDialogComponent } from "./reject-engagement-flag-dialog/reject-engagement-flag-dialog.component";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("communicationPaginator") communicationPaginator: MatPaginator;
  @ViewChild("communicationSort") communicationSort: MatSort;
  @ViewChild("absencePaginator") absencePaginator: MatPaginator;
  @ViewChild("absenceSort") absenceSort: MatSort;
  @ViewChild("pointsPaginator") pointsPaginator: MatPaginator;
  @ViewChild("pointsSort") pointsSort: MatSort;
  @ViewChild("courseSort") courseSort: MatSort;
  @ViewChild("engagementFlagSort") engagementFlagSort: MatSort;
  @ViewChild("engagementFlagPaginator") engagementFlagPaginator: MatPaginator;

  readonly environment = environment;
  readonly Utility = Utility;
  readonly Trend = Trend;
  readonly CommunicationType = CommunicationType;
  readonly PointsType = PointsType;
  readonly minDate = new Date("2020-1-1");
  readonly maxDate = new Date("2050-12-31");
  readonly gradeLevels: string[] = Constants.grades;
  readonly communicationDisplayedColumns = ["moreOptions", "date", "name", "type", "wasSuccessful", "notes"];
  readonly pointsDisplayedColumns = ["moreOptions", "date", "staffName", "type", "value", "comments"];
  readonly courseDisplayedColumns = [
    "className",
    "onlineHoursSpentThisWeek",
    "assignmentsCompletedDateRange",
    "assignmentsCompletedOnTime",
    "totalSecondsSpentOnline",
    "assignmentsCompleted",
    "assignmentsInGracePeriod",
    "score",
  ];
  readonly engagementFlagDisplayedColumns = [
    "moreOptions",
    "approvedStatus",
    "weekOfDate",
    "actualCommunications",
    "actualLiveLessons",
    "actualCourseHours",
    "rejectedReason",
  ];
  readonly absenceDisplayedColumns: string[] = ["moreOptions", "dateRange", "reason", "userName"];

  loadingStudent = true;
  ignoreRoute = false;
  initializing = true;
  studentNameFilter = new UntypedFormControl();
  gradeLevelFilter = new UntypedFormControl();
  schoolFilter = new UntypedFormControl();
  myStudentsFilter = new UntypedFormControl();
  flaggedStudentsFilter = new UntypedFormControl();
  students: StudentSearchInformation[] = [{ name: "Loading..." }];
  selectedStudent: StudentSearchInformation;
  filteredStudents: StudentSearchInformation[] = [];
  communicationDataSource = new MatTableDataSource();
  communicationStartDateFilter = new UntypedFormControl();
  communicationEndDateFilter = new UntypedFormControl();
  absenceDataSource = new MatTableDataSource();
  absenceStartDateFilter = new UntypedFormControl();
  absenceEndDateFilter = new UntypedFormControl();
  pointsDataSource = new MatTableDataSource();
  pointsStartDateFilter = new UntypedFormControl();
  pointsEndDateFilter = new UntypedFormControl();
  allowPointRecording = true;
  loadingCourses = true;
  courseDataSource = new MatTableDataSource();
  engagementFlagDataSource = new MatTableDataSource();
  schoolYears = this.schoolYearOptions();
  schoolYearFilter = new UntypedFormControl();
  enrollmentDateControl = new UntypedFormControl();
  unenrollmentDateControl = new UntypedFormControl();
  studentDatasource: IDatasource;

  studentSubscriptions: Subscription[] = [];
  subscriptions: Subscription[] = [];

  get selectedStudentHomeAddress(): string {
    return [
      this.selectedStudent.homeAddress,
      this.selectedStudent.city,
      this.selectedStudent.state,
      this.selectedStudent.zipCode,
    ]
      .filter(x => x)
      .join(", ");
  }

  /** Returns the Lincoln Learning ID if exists, otherwise the Flex Point ID. */
  get buzzId(): number {
    // LL is for high school, so take that ID over FP if both exist
    return this.selectedStudent?.lincolnLearningId ?? this.selectedStudent?.flexPointId;
  }

  get user() {
    return this.staffService.user;
  }

  constructor(
    private appComponent: AppComponent,
    private commonService: CommonService,
    private authService: AuthService,
    private staffService: StaffService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    router: Router
  ) {
    this.initCommunications();
    this.initAbsences();
    this.initPoints();
    this.initEngagementFlags();

    this.subscriptions.push(
      router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          if (this.ignoreRoute) {
            this.ignoreRoute = false;
          } else {
            this.ngOnInit();
          }
        }
      })
    );

    this.createStudentDatasource();
  }

  initCommunications() {
    this.maxDate.setFullYear(new Date().getFullYear() + 50);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    this.communicationStartDateFilter.patchValue(startDate);

    this.subscriptions.push(
      this.communicationStartDateFilter.valueChanges.subscribe(value => {
        if (this.communicationEndDateFilter.value && this.communicationEndDateFilter.value < value && value !== null) {
          this.communicationEndDateFilter.patchValue(value);
        } else {
          this.loadCommunications();
        }
      }),

      this.communicationEndDateFilter.valueChanges.subscribe(value => {
        if (
          this.communicationStartDateFilter.value &&
          this.communicationStartDateFilter.value > value &&
          value !== null
        ) {
          this.communicationStartDateFilter.patchValue(value);
        } else {
          this.loadCommunications();
        }
      })
    );
  }

  initAbsences() {
    this.maxDate.setFullYear(new Date().getFullYear() + 50);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    this.absenceStartDateFilter.patchValue(startDate);

    this.subscriptions.push(
      this.absenceStartDateFilter.valueChanges.subscribe(value => {
        if (this.absenceEndDateFilter.value && this.absenceEndDateFilter.value < value && value !== null) {
          this.absenceEndDateFilter.patchValue(value);
        } else {
          this.loadAbsences();
        }
      }),

      this.absenceEndDateFilter.valueChanges.subscribe(value => {
        if (this.absenceStartDateFilter.value && this.absenceStartDateFilter.value > value && value !== null) {
          this.absenceStartDateFilter.patchValue(value);
        } else {
          this.loadAbsences();
        }
      })
    );
  }

  initPoints() {
    this.maxDate.setFullYear(new Date().getFullYear() + 50);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    this.pointsStartDateFilter.patchValue(startDate);

    this.subscriptions.push(
      this.pointsStartDateFilter.valueChanges.subscribe(value => {
        if (this.pointsEndDateFilter.value && this.pointsEndDateFilter.value < value && value !== null) {
          this.pointsEndDateFilter.patchValue(value);
        } else {
          this.loadPoints();
        }
      }),

      this.pointsEndDateFilter.valueChanges.subscribe(value => {
        if (this.pointsStartDateFilter.value && this.pointsStartDateFilter.value > value && value !== null) {
          this.pointsStartDateFilter.patchValue(value);
        } else {
          this.loadPoints();
        }
      })
    );
  }

  initEngagementFlags() {
    this.schoolYearFilter.patchValue(this.schoolYears[0]);
    this.subscriptions.push(this.schoolYearFilter.valueChanges.subscribe(() => this.loadEngagementFlags()));
  }

  ngOnInit() {
    const studentIdQueryValue = this.route.snapshot.queryParams["studentId"]
      ? Number(this.route.snapshot.queryParams["studentId"])
      : undefined;

    this.gradeLevelFilter.patchValue("All");
    this.schoolFilter.patchValue("AmEdustudents.org");
    this.myStudentsFilter.patchValue(
      this.authService.currentUser.isMentor || this.authService.currentUser.isSecondaryMentor
    );

    this.staffService
      .returnStudentSearchInformation()
      .subscribe(students => {
        this.students = students;

        if (students.length) {
          for (let i = 0; i < students.length; i++) {
            if (
              (studentIdQueryValue && students[i].id === studentIdQueryValue) ||
              (!studentIdQueryValue && this.filterStudent(students[i]))
            ) {
              this.selectStudent(students[i]);
              return;
            }
          }
        }

        this.appComponent.isBusy = false;
      })
      .add(() => {
        this.initializing = false;
        this.resetStudentDatasource();
      });
  }

  createStudentDatasource() {
    this.studentDatasource = new Datasource<StudentSearchInformation>({
      get: (index, count, success) => {
        this.filteredStudents = this.students ? this.students.filter(student => this.filterStudent(student)) : [];

        const data = [];
        for (let i = index; i <= index + count - 1; i++) {
          if (i >= this.filteredStudents.length) {
            break;
          }

          data.push(this.filteredStudents[i]);
        }
        success(data);
      },
      settings: {
        minIndex: 0,
        startIndex: 0,
      },
    });

    this.subscriptions.push(
      this.studentNameFilter.valueChanges.subscribe(() => this.resetStudentDatasource()),
      this.gradeLevelFilter.valueChanges.subscribe(() => this.resetStudentDatasource()),
      this.schoolFilter.valueChanges.subscribe(() => this.resetStudentDatasource()),
      this.myStudentsFilter.valueChanges.subscribe(() => this.resetStudentDatasource()),
      this.flaggedStudentsFilter.valueChanges.subscribe(() => this.resetStudentDatasource())
    );
  }

  resetStudentDatasource() {
    this.studentDatasource.adapter.reload(0);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.studentSubscriptions.forEach(s => s.unsubscribe());
  }

  selectStudent(student: Student) {
    this.loadingStudent = true;
    this.selectedStudent = student.name === "Loading..." ? null : student;
    this.communicationDataSource = new MatTableDataSource([]); // reset grid so that it doesn't temporarily show old data on student change
    this.loadCommunications();
    this.loadAbsences();
    this.pointsDataSource = new MatTableDataSource([]);
    this.loadPoints();
    this.courseDataSource = new MatTableDataSource([]);
    this.loadCourses();
    this.engagementFlagDataSource = new MatTableDataSource([]);
    this.loadEngagementFlags();
    this.absenceDataSource = new MatTableDataSource([]);

    if (this.selectedStudent) {
      history.replaceState(null, null, location.pathname + "?studentId=" + student.id);

      if (this.selectedStudent.mentorId === this.user.userId || this.user.isAdmin || this.user.isInterventionist) {
        if (this.engagementFlagDisplayedColumns[0] !== "moreOptions") {
          this.engagementFlagDisplayedColumns.unshift("moreOptions");
        }
      } else if (this.engagementFlagDisplayedColumns[0] === "moreOptions") {
        this.engagementFlagDisplayedColumns.shift();
      }

      this.studentSubscriptions.forEach(s => s.unsubscribe());
      this.studentSubscriptions = [];

      this.staffService
        .returnStudentSearchInformationByStudentId(this.selectedStudent.id)
        .pipe(finalize(() => (this.loadingStudent = false)))
        .subscribe(studentInformation => {
          if (studentInformation.id === this.selectedStudent.id) {
            this.selectedStudent = studentInformation;
            this.enrollmentDateControl = new UntypedFormControl();
            this.enrollmentDateControl.patchValue(this.selectedStudent.enrollmentDate);
            this.studentSubscriptions.push(
              this.enrollmentDateControl.valueChanges.subscribe(value => {
                const isBusy = this.appComponent.isBusy;
                this.appComponent.isBusy = true;
                this.staffService
                  .updateEnrollmentDate(value, this.selectedStudent.id)
                  .subscribe()
                  .add(() => {
                    this.appComponent.isBusy = isBusy ? this.appComponent.isBusy : false;
                  });
              })
            );
            this.unenrollmentDateControl = new UntypedFormControl();
            this.unenrollmentDateControl.patchValue(this.selectedStudent.unenrollmentDate);
            this.studentSubscriptions.push(
              this.unenrollmentDateControl.valueChanges.subscribe(value => {
                const isBusy = this.appComponent.isBusy;
                this.appComponent.isBusy = true;
                this.staffService
                  .updateUnenrollmentDate(value, this.selectedStudent.id)
                  .subscribe()
                  .add(() => {
                    this.appComponent.isBusy = isBusy ? this.appComponent.isBusy : false;
                  });
              })
            );
          }
          this.students[this.students.findIndex(s => s.id === studentInformation.id)] = studentInformation; // update master list
        });
    } else {
      this.loadingStudent = false;
    }
  }

  filterStudent(student: StudentSearchInformation): boolean {
    if (student.name === "Loading...") {
      return true;
    }

    if (this.studentNameFilter.value) {
      const searchFieldIndex = (
        [
          "firstName",
          "lastName",
          "name",
          "studentEmail",
          "guardianEmailAddress",
          "secondaryGuardianEmailAddress",
        ] as (keyof StudentSearchInformation)[]
      )
        .filter(field => student[field])
        .map(field => `${student[field]}`.split(" ").join("").toLowerCase())
        .join("");

      if (!searchFieldIndex.includes(this.studentNameFilter.value.split(" ").join("").toLowerCase())) {
        return false;
      }
    }

    if (!!this.gradeLevelFilter.value && this.gradeLevelFilter.value !== "All") {
      if (student.gradeLevel !== this.gradeLevelFilter.value) {
        return false;
      }
    }

    if (!!this.schoolFilter.value && this.schoolFilter.value !== "All") {
      if (!student.studentEmail.toLowerCase().endsWith(this.schoolFilter.value)) {
        return false;
      }
    }

    if (this.myStudentsFilter.value && !student.isMyStudent) {
      return false;
    }

    if (this.flaggedStudentsFilter.value && !student.missedLastWeeksRequirements) {
      return false;
    }

    return true;
  }

  openStudentAvatarDialog(student: Student) {
    this.dialog
      .open(AvatarDialogComponent, {
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          student: student,
          hideStudentPageLink: true,
        },
      })
      .afterClosed()
      .subscribe((info: StudentInformation) => {
        if (info) {
          this.selectedStudent.notes = info.notes;
          this.selectedStudent.guardianName = info.guardianName;
          this.selectedStudent.preferredWayToContactGuardian = info.preferredWayToContactGuardian.toString();
          this.selectedStudent.bestTimeToReachGuardian = info.bestTimeToReachGuardian.toString();
          this.selectedStudent.guardianEmailAddress = info.guardianEmailAddress;
          this.selectedStudent.guardianPhoneNumber = info.guardianPhoneNumber;
          this.selectedStudent.guardianRelationship = info.guardianRelationship;
          this.selectedStudent.guardianIsSubscribedToWeeklySnapshotEmail =
            info.guardianIsSubscribedToWeeklySnapshotEmail;
          this.selectedStudent.secondaryGuardianEmailAddress = info.secondaryGuardianEmailAddress;
          this.selectedStudent.secondaryGuardianName = info.secondaryGuardianName;
          this.selectedStudent.secondaryGuardianPhoneNumber = info.secondaryGuardianPhoneNumber;
          this.selectedStudent.secondaryGuardianRelationship = info.secondaryGuardianRelationship;
          this.selectedStudent.secondaryGuardianIsSubscribedToWeeklySnapshotEmail =
            info.secondaryGuardianIsSubscribedToWeeklySnapshotEmail;
          this.selectedStudent.studentPersonalEmailAddress = info.studentEmailAddress;
          this.selectedStudent.studentPhoneNumber = info.studentPhoneNumber;
          this.selectedStudent.studentBirthday = info.studentBirthday;
          this.selectedStudent.bestTimeToReachStudent = info.bestTimeToReachStudent.toString();
          this.selectedStudent.preferredWayToContactStudent = info.bestTimeToReachStudent.toString();
          this.selectedStudent.homeAddress = info.homeAddress;
          this.selectedStudent.city = info.city;
          this.selectedStudent.state = info.state;
          this.selectedStudent.zipCode = info.zipCode;
          this.selectedStudent.notesAboutMe = info.notesAboutMe;
        }
      });
  }

  loadCourses() {
    if (!this.selectedStudent) {
      return;
    }

    const studentId = this.selectedStudent.id;
    this.loadingCourses = this.appComponent.isBusy = true;
    this.commonService.returnClassUsersByStudentId(studentId).subscribe(studentClasses => {
      if (!this.selectedStudent || studentId !== this.selectedStudent.id) {
        return; // student changed, don't update UI
      }

      studentClasses = studentClasses.filter(x => x.status === EnrollmentStatus.Active); // only show active courses on this view

      this.courseDataSource = new MatTableDataSource(studentClasses);
      this.courseDataSource.sortingDataAccessor = (item: ClassUser, property) => {
        // custom sort on this column
        if (property === "score") {
          return item.scorePossible ? item.scoreAchieved / item.scorePossible : -1;
        }
        return item[property];
      };
      this.courseDataSource.sort = this.courseSort;
      this.loadingCourses = this.appComponent.isBusy = false;
    });
  }

  loadEngagementFlags() {
    if (!this.selectedStudent) {
      return;
    }

    const studentId = this.selectedStudent.id;
    this.appComponent.isBusy = true;
    this.studentService
      .returnEngagementFlagsByStudentId(studentId, { schoolYear: this.schoolYearFilter.value })
      .subscribe(engagementFlags => {
        if (!this.selectedStudent || studentId !== this.selectedStudent.id) {
          return; // student changed, don't update UI
        }

        this.engagementFlagDataSource = new MatTableDataSource(engagementFlags);
        this.engagementFlagDataSource.sort = this.engagementFlagSort;
        this.engagementFlagDataSource.paginator = this.engagementFlagPaginator;
        this.appComponent.isBusy = false;
      });
  }

  loadCommunications() {
    if (!this.selectedStudent) {
      return;
    }

    const studentId = this.selectedStudent.id;
    this.appComponent.isBusy = true;
    this.staffService
      .returnCommunications(studentId, this.communicationStartDateFilter.value, this.communicationEndDateFilter.value)
      .subscribe(communications => {
        if (!this.selectedStudent || studentId !== this.selectedStudent.id) {
          return; // student changed, don't update UI
        }

        this.communicationDataSource = new MatTableDataSource(communications);
        this.communicationDataSource.paginator = this.communicationPaginator;
        this.communicationDataSource.sort = this.communicationSort;
        this.appComponent.isBusy = false;
      });
  }

  addCommunication() {
    this.dialog
      .open(CommunicationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        position: { top: "top" },
        data: { student: this.selectedStudent },
      })
      .beforeClosed()
      .subscribe((newCommunication: Communication) => {
        if (newCommunication) {
          if (newCommunication.awardPoint) {
            if (newCommunication.date >= Utility.getBeginningOfWeek()) {
              this.selectedStudent.communicationPoints++;
            }
            this.selectedStudent.pointBalance++;
          }
          this.loadCommunications();
        }
      });
  }

  editCommunication(communication: Communication) {
    this.dialog
      .open(CommunicationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        position: { top: "top" },
        data: { student: this.selectedStudent, communication },
      })
      .beforeClosed()
      .subscribe((editCommunication: Communication) => {
        if (editCommunication) {
          const beginningOfWeek = Utility.getBeginningOfWeek();

          const addPoint = editCommunication.awardPoint && !communication.awardPoint;
          const subtractPoint = !editCommunication.awardPoint && communication.awardPoint;

          if (new Date(communication.date) >= beginningOfWeek) {
            if (new Date(editCommunication.date) < beginningOfWeek) {
              this.selectedStudent.communicationPoints--;
            } else {
              this.selectedStudent.communicationPoints += addPoint ? 1 : subtractPoint ? -1 : 0;
            }
          } else if (new Date(editCommunication.date) >= beginningOfWeek) {
            this.selectedStudent.communicationPoints += addPoint ? 1 : subtractPoint ? -1 : 0;
          }

          this.selectedStudent.pointBalance += addPoint ? 1 : subtractPoint ? -1 : 0;
          this.loadCommunications();
          this.loadPoints();
        }
      });
  }

  deleteCommunication(communication: Communication) {
    this.appComponent.isBusy = true;
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this communication entry? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.staffService.deleteCommunication(communication.id).subscribe(result => {
            if (result) {
              if (communication.awardPoint) {
                if (new Date(communication.date) >= Utility.getBeginningOfWeek()) {
                  this.selectedStudent.communicationPoints--;
                }
                this.selectedStudent.pointBalance--;
              }
              this.loadCommunications();
            } else {
              this.snackBar.open("Failed to delete communication entry", "Close", {
                panelClass: "success",
                duration: 3500,
              });
              this.appComponent.isBusy = false;
            }
          });
        } else {
          this.appComponent.isBusy = false;
        }
      });
  }

  loadAbsences() {
    if (!this.selectedStudent) {
      return;
    }
    const studentId = this.selectedStudent.id;
    this.appComponent.isBusy = true;
    this.teacherService
      .returnAbsences(studentId, this.absenceStartDateFilter.value, this.absenceEndDateFilter.value)
      .subscribe(absences => {
        if (!this.selectedStudent || studentId !== this.selectedStudent.id) {
          return; // student changed, don't update UI
        }

        this.absenceDataSource = new MatTableDataSource(absences);
        this.absenceDataSource.paginator = this.communicationPaginator;
        this.absenceDataSource.sort = this.absenceSort;
        this.appComponent.isBusy = false;
      });
  }

  addAbsence() {
    this.dialog
      .open(AbsenceDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        position: { top: "top" },
        data: { student: this.selectedStudent },
      })
      .beforeClosed()
      .subscribe((newAbsence: Absence) => {
        if (newAbsence) {
          this.loadAbsences();
        }
      });
  }

  editAbsence(absence: Absence) {
    this.dialog
      .open(AbsenceDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        position: { top: "top" },
        data: { student: this.selectedStudent, absence },
      })
      .beforeClosed()
      .subscribe((editAbsence: Absence) => {
        if (editAbsence) {
          this.loadAbsences();
        }
      });
  }

  deleteAbsence(absence: Absence) {
    this.appComponent.isBusy = true;
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this excused absence entry?",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.teacherService.deleteAbsence(absence.id).subscribe(result => {
            if (result) {
              this.loadAbsences();
            } else {
              this.snackBar.open("Failed to delete absence entry", "Close", { panelClass: "success", duration: 3500 });
              this.appComponent.isBusy = false;
            }
          });
        } else {
          this.appComponent.isBusy = false;
        }
      });
  }

  loadPoints() {
    if (!this.selectedStudent) {
      return;
    }

    const studentId = this.selectedStudent.id;
    this.appComponent.isBusy = true;
    this.staffService
      .returnPoints(studentId, this.pointsStartDateFilter.value, this.pointsEndDateFilter.value)
      .subscribe(points => {
        if (!this.selectedStudent || studentId !== this.selectedStudent.id) {
          return; // student changed, don't update UI
        }

        this.pointsDataSource = new MatTableDataSource(points);
        this.pointsDataSource.paginator = this.pointsPaginator;
        this.pointsDataSource.sort = this.pointsSort;
        this.appComponent.isBusy = false;
        this.allowPointRecording = true;
      });
  }

  recordPoint(type: PointsType, value: number) {
    // validate points
    switch (type) {
      case PointsType.Integrity:
        if (this.selectedStudent.integrityPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Stewardship:
        if (this.selectedStudent.stewardshipPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Respect:
        if (this.selectedStudent.respectPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
      case PointsType.Engagement:
        if (this.selectedStudent.engagementPoints + value < 0) {
          return; // don't allow negative points
        }
        break;
    }

    const points: Points = { userId: this.selectedStudent.id, type, value };

    this.dialog
      .open(AwardPointDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: { student: this.selectedStudent, points },
      })
      .afterClosed()
      .subscribe(submit => {
        if (!submit) {
          return;
        }

        // update points
        switch (type) {
          case PointsType.Integrity:
            this.selectedStudent.integrityPoints += value;
            break;
          case PointsType.Stewardship:
            this.selectedStudent.stewardshipPoints += value;
            break;
          case PointsType.Respect:
            this.selectedStudent.respectPoints += value;
            break;
          case PointsType.Engagement:
            this.selectedStudent.engagementPoints += value;
            break;
        }

        this.allowPointRecording = false;

        this.selectedStudent.pointBalance += value;
        this.selectedStudent.cumulativePoints += value;

        this.staffService.createPoints(points).subscribe(result => {
          if (result) {
            if (this.selectedStudent.id === points.userId) {
              this.loadPoints();
            }
          } else {
            this.snackBar.open("Failed to record points", "Close", { panelClass: "success", duration: 3500 });
            this.allowPointRecording = true;
          }
        });
      });
  }

  deletePoints(points: Points) {
    this.appComponent.isBusy = true;
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this points entry? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.staffService.deletePoints(points.id).subscribe(result => {
            if (result) {
              this.loadPoints();
              this.selectedStudent.pointBalance -= points.value;
              switch (points.type) {
                case PointsType.Stewardship:
                  this.selectedStudent.stewardshipPoints -= points.value;
                  break;
                case PointsType.Integrity:
                  this.selectedStudent.integrityPoints -= points.value;
                  break;
                case PointsType.Communication: {
                  if (points.date >= Utility.getBeginningOfWeek()) {
                    this.selectedStudent.communicationPoints -= points.value;
                  }
                  break;
                }
                case PointsType.Respect:
                  this.selectedStudent.respectPoints -= points.value;
                  break;
                case PointsType.Engagement:
                  this.selectedStudent.engagementPoints -= points.value;
                  break;
              }
            } else {
              this.snackBar.open("Failed to delete points entry", "Close", { panelClass: "success", duration: 3500 });
              this.appComponent.isBusy = false;
            }
          });
        } else {
          this.appComponent.isBusy = false;
        }
      });
  }

  cashOutPoints() {
    const selectedStudent = this.selectedStudent;
    this.allowPointRecording = false;

    this.dialog
      .open(CashOutPointsDialogComponent, {
        width: "550px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: selectedStudent,
      })
      .beforeClosed()
      .subscribe(spentPoints => {
        this.appComponent.isBusy = false;
        if (spentPoints) {
          selectedStudent.pointBalance += spentPoints;

          if (this.selectedStudent.id === selectedStudent.id) {
            this.loadPoints();
            return;
          }
        }
        this.allowPointRecording = true;
      });
  }

  getBeginningOfWeek(endDate: Date) {
    const beginningOfWeek = new Date(endDate);
    beginningOfWeek.setDate(beginningOfWeek.getDate() - 7);
    return beginningOfWeek;
  }

  approveEngagementFlag(engagementFlag: EngagementFlag) {
    if (this.appComponent.isBusy) {
      return;
    }

    const student = this.selectedStudent;

    const approve = (interventionLevel: InterventionLevel = null) => {
      engagementFlag.approvedStatus = true;
      engagementFlag.staffId = this.user.userId;
      engagementFlag.staffName = `${this.user.firstName} ${this.user.lastName}`;
      engagementFlag.interventionLevel = interventionLevel;

      this.appComponent.isBusy = true;
      this.staffService
        .updateEngagementFlag(engagementFlag)
        .subscribe(result => {
          // update local state of intervention level and status
          student.interventionLevel = result?.level;
          student.interventionStatus = result?.status;
        })
        .add(() => (this.appComponent.isBusy = false));
    };

    if (this.selectedStudent.interventionLevel === null) {
      this.dialog
        .open(InterventionDetailsDialogComponent)
        .beforeClosed()
        .subscribe((interventionLevel: InterventionLevel) => {
          if (interventionLevel !== null) {
            approve(interventionLevel);
          }
        });
    } else {
      approve();
    }
  }

  rejectEngagementFlag(engagementFlag: EngagementFlag) {
    this.dialog
      .open(RejectEngagementFlagDialogComponent, {
        width: "550px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: engagementFlag,
      })
      .beforeClosed()
      .subscribe((updatedEngagementFlag: EngagementFlag) => {
        if (updatedEngagementFlag) {
          engagementFlag.approvedStatus = updatedEngagementFlag.approvedStatus;
          engagementFlag.rejectedReason = updatedEngagementFlag.rejectedReason;
          engagementFlag.staffId = this.user.userId;
          engagementFlag.staffName = `${this.user.firstName} ${this.user.lastName}`;
        }
      });
  }

  isBirthday(student: StudentSearchInformation) {
    if (!student.studentBirthday) {
      return false;
    } else if (!(student.studentBirthday instanceof Date)) {
      student.studentBirthday = new Date(student.studentBirthday);
    }

    const now = new Date();

    return now.getDate() === student.studentBirthday.getDate() && now.getMonth() == student.studentBirthday.getMonth();
  }

  generateIntervention(student: StudentSearchInformation) {
    this.dialog
      .open(GenerateInterventionDialogComponent, { data: student })
      .beforeClosed()
      .pipe(
        filter((result: boolean) => result && student === this.selectedStudent),
        tap(() => this.selectStudent(student))
      )
      .subscribe();
  }

  getReason(flag: EngagementFlag) {
    if (flag.approvedStatus === false) {
      return flag.rejectedReason;
    } else if (flag.interventionReason) {
      return flag.interventionReason;
    }

    return "N/A";
  }

  private schoolYearOptions(): Date[] {
    const options: Date[] = [];
    let beginningOfSchoolYear = Utility.getBeginningOfSchoolYear();

    do {
      options.push(beginningOfSchoolYear);
      beginningOfSchoolYear = new Date(
        beginningOfSchoolYear.getFullYear() - 1,
        beginningOfSchoolYear.getMonth(),
        beginningOfSchoolYear.getDate()
      );
    } while (beginningOfSchoolYear.getFullYear() >= 2020); // let 2020 be the oldest school year as no data exists prior to it

    return options;
  }
}
