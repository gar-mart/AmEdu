import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentResource } from "@models/student-resource.model";
import { AdminService } from "@services/admin.service";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { CommonService } from "@services/common.service";
import { AppComponent } from "app/app.component";
import {
  Announcement,
  AppTile,
  DirectoryEvent,
  EngagementFlag,
  InterventionThreshold,
  QuoteOfTheDay,
  StepsByStudent,
  Student,
} from "app/models";
import { DirectoryService } from "app/services";
import { environment } from "environments/environment";
import { forkJoin } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { ClassDialogComponent } from "../../../design";
import { Utility } from "../../../shared";
import { StudentService } from "../../services";
import { AnnouncementDialogComponent } from "./components/announcement-dialog/announcement-dialog.component";
import { EmailMentorDialogComponent } from "./components/email-mentor-dialog/email-mentor-dialog.component";
import { EngagementDialogComponent } from "./components/engagement-dialog/engagement-dialog.component";
import { PointBreakdownDialogComponent } from "./components/point-breakdown-dialog/point-breakdown-dialog.component";

// eslint-disable-next-line no-var
declare var GaugeChart: any; // we are referencing the global GaugeChart here from the gauge-chart library

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class StudentDashboardComponent implements OnInit {
  readonly isNaN = isNaN;
  readonly encodeURIComponent = encodeURIComponent;
  readonly inboxUrl =
    this.authService.currentUser.signInProvider === "Microsoft" ? environment.microsoftInboxUrl : environment.inboxUrl;
  readonly chatUrl = this.authService.currentUser.signInProvider === "Microsoft" ? "" : environment.chatUrl;

  @ViewChild("liveLessonGaugeChart")
  liveLessonGaugeChart: ElementRef;

  @ViewChild("communicationGaugeChart")
  communicationGaugeChart: ElementRef;

  @ViewChild("assignmentGaugeChart")
  assignmentGaugeChart: ElementRef;

  events: string[] = [];
  hasStarted = true;
  isComplete = false;
  progress: number;
  studentSteps: StepsByStudent[];
  totalSteps: number;
  completedSteps: number;
  student: Student;
  form: UntypedFormGroup;
  mentorPictureUrl = "";
  interventionThreshold: InterventionThreshold;
  resourcesByCategory: Map<string, StudentResource[]>;

  fillRowTiles = [];
  appTiles: AppTile[] = [];
  editingAppTiles: AppTile[] = [];
  appTileGroups: AppTile[][] = [];
  quoteOfTheDay: QuoteOfTheDay;
  announcements: Announcement[] = [];
  unreadEmailCount: number;
  calendarEvents: DirectoryEvent[] = [];
  engagementFlags: EngagementFlag[] = [];

  secondaryMentorPictureUrl = "";
  gradeLevel: string;
  loading = true;

  studentId: number;

  communicationGaugeOptions;
  liveLessonGaugeOptions;
  assignmentGaugeOptions;

  get user() {
    return this.authorizationService.user;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private commonService: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private directoryService: DirectoryService,
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private studentService: StudentService,
    private adminService: AdminService
  ) {
    if (this.route.snapshot.queryParamMap.has("studentId")) {
      this.studentId = parseInt(this.route.snapshot.queryParamMap.get("studentId"));
    }
    this.form = this.fb.group({
      studentGradeLevel: [null, Validators.required],
    });
  }

  ngOnInit() {
    setTimeout(() => (this.appComponent.isBusy = true));

    this.studentId = this.studentId ? this.studentId : this.user.userId;
    this.commonService
      .getStudentById(this.studentId)
      .pipe(
        map(result => {
          this.student = result;
          this.gradeLevel = this.student.gradeLevel;
          this.populateFormWithData(this.student);
          this.completedSteps = this.student.completedSteps;
          this.totalSteps = this.student.totalSteps;
          this.hasStarted = this.student.orientationStartTime ? true : false;
          this.progress = this.student.progressPercent * 100;
          this.isComplete = this.student.progressPercent >= 1;
          this.mentorPictureUrl = result.mentorPicture;
          this.secondaryMentorPictureUrl = result.secondaryMentorPicture;

          if (!this.user.isStaff && !this.isComplete && this.totalSteps > 0 && !Utility.orientationModuleIsLoaded) {
            // if the student hasn't already been redirected to the orientation module, and the student hasn't completed orientation, take them there.
            this.router.navigateByUrl("/student/orientation");
            return false;
          }
          return true;
        }),
        filter(shouldContinue => shouldContinue),
        switchMap(() =>
          forkJoin({
            assignmentsCompleted: this.studentService.returnAssignmentsCompleted(
              this.studentId,
              Utility.getBeginningOfWeek(),
              Utility.getEndOfWeek()
            ),
            interventionThreshold: this.studentService.returnInterventionThreshold(this.student.gradeLevel),
            appTiles: this.studentService.returnAppTiles(this.studentId),
            announcements: this.studentService.returnAnnouncements(this.studentId),
            unreadEmailCount: this.directoryService.returnUnreadInboxCount(this.student.email),
            calendarEvents: this.directoryService.returnCalendarEvents(this.student.email),
            studentResources: this.getStudentResources(),
            engagementFlags: this.studentService.returnEngagementFlagsByStudentId(this.studentId, {
              acknowledgedByStudent: false,
            }),
          })
        )
      )
      .subscribe(data => {
        this.interventionThreshold = data.interventionThreshold || {};
        this.appTiles = data.appTiles;
        this.announcements = data.announcements;
        this.unreadEmailCount = data.unreadEmailCount || 0;
        this.calendarEvents = data.calendarEvents || [];
        this.engagementFlags = data.engagementFlags || [];

        this.setAppTileGroups(this.appTiles.filter(appTile => appTile.show));

        this.communicationGaugeOptions = this.buildGaugeOptions(
          this.interventionThreshold.minimumCommunicationLogs,
          this.interventionThreshold.expectedCommunicationLogs,
          this.student.communicationPoints
        );
        this.liveLessonGaugeOptions = this.buildGaugeOptions(
          this.interventionThreshold.minimumLiveLessons,
          this.interventionThreshold.expectedLiveLessons,
          this.student.liveLessonPoints
        );

        // todo: we can remove the following condition after 4/15 - AmEdu only wants staff members to see the new assignment gauge until 4/15
        if (this.user.isStaff || new Date() > new Date(2024, 3, 15)) {
          if (data.assignmentsCompleted.totalCount && +this.student.gradeLevel >= 6) {
            this.assignmentGaugeOptions = this.buildGaugeOptions(
              // this is a percentage based gauge, so our minimum is 100% and the maximum is 100%
              100,
              100,
              (data.assignmentsCompleted.completedCount / data.assignmentsCompleted.totalCount) * 100,
              true
            );
          }
        } else {
          console.warn(
            "Not showing the assignment gauge because the current user is a student, and it is currently before 4/15/2024."
          );
        }

        this.appComponent.isBusy = false;
        this.loading = false;

        setTimeout(() => this.initializeCharts());
      });

    this.studentService.returnQuoteOfTheDay().subscribe(quoteOfTheDay => {
      this.quoteOfTheDay = quoteOfTheDay;
    });
  }

  getStudentResources() {
    return this.adminService.returnStudentResources().pipe(
      tap(result => {
        let filtered = result.filter(resource => {
          let filteredResource = resource.showOnStudentDashboard;
          filteredResource &&= resource.studentResourceGradeLevels.some(g => {
            return g.gradeLevel === this.gradeLevel;
          });

          return filteredResource;
        });

        let resourceMap = new Map<string, StudentResource[]>();

        filtered.forEach(resource => {
          if (resourceMap.has(resource.category)) {
            resourceMap.get(resource.category).push(resource);
          } else {
            resourceMap.set(resource.category, [resource]);
          }
        });

        this.resourcesByCategory = resourceMap;
      })
    );
  }

  openEngagementFlags() {
    this.dialog
      .open(EngagementDialogComponent, {
        data: this.engagementFlags,
      })
      .afterClosed()
      .pipe(
        switchMap(() =>
          // acknowledge all engagement flags, there should really just be one typically
          forkJoin(this.engagementFlags.map(ef => this.studentService.acknowledgeEngagementFlag(ef.id, true)))
        )
      )
      .subscribe();
  }

  setAppTileGroups(appTiles) {
    const appTilesPerGroup = 4;
    const appTileGroups = [];
    this.fillRowTiles = [];

    let currentGroup;
    for (let i = 0; i < appTiles.length; i++) {
      if (i % appTilesPerGroup === 0) {
        currentGroup = [];
        appTileGroups.push(currentGroup);
      }
      currentGroup.push(appTiles[i]);
    }

    if (appTileGroups.length) {
      while (appTileGroups[appTileGroups.length - 1].length + this.fillRowTiles.length !== appTilesPerGroup) {
        this.fillRowTiles.push(1);
      }
    }

    this.appTileGroups = appTileGroups;
  }

  private populateFormWithData(user: Student) {
    this.form.patchValue(
      {
        studentGradeLevel: user.gradeLevel,
      },
      {
        emitEvent: false,
      }
    );
  }

  openEmailDialog(student: Student, isSecondaryMentor: boolean): void {
    this.dialog.open(EmailMentorDialogComponent, {
      width: "450px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
        isSecondaryMentor,
      },
    });
  }

  startAppTileEdits() {
    this.editingAppTiles = JSON.parse(JSON.stringify(this.appTiles)).sort((a, b) => b.show - a.show);
    this.setAppTileGroups(this.editingAppTiles);
  }

  cancelAppTileEdits() {
    this.setAppTileGroups(this.appTiles.filter(appTile => appTile.show));
    this.editingAppTiles = [];
  }

  saveAppTileEdits() {
    this.appTiles = this.editingAppTiles;
    this.setAppTileGroups(this.appTiles.filter(appTile => appTile.show));
    this.editingAppTiles = [];

    // perform save
    this.studentService.updateAppTiles(this.studentId, this.appTiles).subscribe(success => {
      if (!success) {
        this.snackBar.open("App tiles failed to update", "Close", { panelClass: "success", duration: 3500 });
      }
    });
  }

  shiftAppTileLeft(e, appTile) {
    e.stopPropagation();

    const currentIndex = this.editingAppTiles.indexOf(appTile);
    let newIndex = currentIndex === 0 ? this.editingAppTiles.length - 1 : currentIndex - 1;

    const lastVisibleIndex = this.editingAppTiles.findIndex(tile => !tile.show) - 1;

    while (newIndex !== lastVisibleIndex && !this.editingAppTiles[newIndex].show) {
      newIndex = newIndex === 0 ? this.editingAppTiles.length - 1 : newIndex - 1;
    }

    this.editingAppTiles[currentIndex] = this.editingAppTiles[newIndex];
    this.editingAppTiles[newIndex] = appTile;

    this.setAppTileGroups(this.editingAppTiles);
  }

  shiftAppTileRight(e, appTile) {
    e.stopPropagation();

    const currentIndex = this.editingAppTiles.indexOf(appTile);
    let newIndex = currentIndex === this.editingAppTiles.length - 1 ? 0 : currentIndex + 1;

    while (newIndex !== 0 && !this.editingAppTiles[newIndex].show) {
      newIndex = newIndex === this.editingAppTiles.length - 1 ? 0 : newIndex + 1;
    }

    this.editingAppTiles[currentIndex] = this.editingAppTiles[newIndex];
    this.editingAppTiles[newIndex] = appTile;

    this.setAppTileGroups(this.editingAppTiles);
  }

  toggleAppTileVisibility(e, appTile: AppTile) {
    e.stopPropagation();
    appTile.show = !appTile.show;

    const totalAppTiles = this.editingAppTiles.length;

    this.editingAppTiles.splice(this.editingAppTiles.indexOf(appTile), 1);

    if (appTile.show) {
      for (let i = 0; i < totalAppTiles; i++) {
        if (i === totalAppTiles - 1) {
          this.editingAppTiles.push(appTile);
        } else if (!this.editingAppTiles[i].show) {
          appTile = this.editingAppTiles.splice(i, 1, appTile)[0];
        }
      }
    } else {
      this.editingAppTiles.push(appTile);
    }

    this.setAppTileGroups(this.editingAppTiles);
  }

  toLocalDate(val) {
    const date = new Date(val);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }

  openAnnouncement(announcement: Announcement) {
    if (this.appComponent.isBusy) {
      return;
    }

    this.appComponent.isBusy = true;

    const self = this;

    function openAnnouncementDialog() {
      self.appComponent.isBusy = false;
      self.dialog
        .open(AnnouncementDialogComponent, {
          autoFocus: false,
          panelClass: ["rounded-dialog-window"],
          data: announcement,
        })
        .beforeClosed()
        .subscribe(() => {
          if (!announcement.isRead) {
            announcement.isRead = true;
            self.studentService.markAnnouncementRead(announcement.id).subscribe();
          }
        });
    }

    if (!announcement.body) {
      this.studentService.returnAnnouncementById(announcement.id).subscribe(a => {
        const temp = document.createElement("div");
        temp.innerHTML = a.body;
        announcement.body = temp.innerText;
        openAnnouncementDialog();
      });
    } else {
      openAnnouncementDialog();
    }
  }

  openClassDialog() {
    this.dialog.open(ClassDialogComponent, {
      minWidth: "500px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: { student: this.student },
    });
  }

  openPointBreakdown() {
    this.dialog.open(PointBreakdownDialogComponent, {
      minWidth: "300px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: this.student,
    });
  }

  private initializeCharts() {
    if (this.communicationGaugeChart?.nativeElement) {
      const cGauge = GaugeChart.gaugeChart(
        this.communicationGaugeChart.nativeElement,
        300,
        this.communicationGaugeOptions.options
      );
      cGauge.updateNeedle(this.communicationGaugeOptions.needleValue);
    }

    if (this.liveLessonGaugeChart?.nativeElement) {
      const lGauge = GaugeChart.gaugeChart(
        this.liveLessonGaugeChart.nativeElement,
        300,
        this.liveLessonGaugeOptions.options
      );
      lGauge.updateNeedle(this.liveLessonGaugeOptions.needleValue);
    }

    if (this.assignmentGaugeChart?.nativeElement) {
      const aGauge = GaugeChart.gaugeChart(
        this.assignmentGaugeChart.nativeElement,
        300,
        this.assignmentGaugeOptions.options
      );
      aGauge.updateNeedle(this.assignmentGaugeOptions.needleValue);
    }
  }

  private buildGaugeOptions(
    minimumRequiredValue: number,
    expectedValue: number,
    currentValue: number,
    isPercentageGauge = false
  ) {
    if (minimumRequiredValue === null || !expectedValue) {
      return null;
    }

    const red = "#f44336";
    const yellow = "#fb8c00";
    const green = "#9ccc65";
    const blue = "#4fc3f7";
    const arcDelimiters: number[] = [];
    const arcColors: string[] = [];

    // set defaults to simplify edge-cases / reduce code
    let total = expectedValue * 2;
    let expectedDelimiter = 50;
    let minimumDelimiter = expectedDelimiter;

    if (isPercentageGauge) {
      total = 100;
      expectedDelimiter = 100;
      minimumDelimiter = 0;

      arcColors.push(blue);
    } else {
      if (minimumRequiredValue) {
        arcColors.push(red);

        if (minimumRequiredValue !== expectedValue) {
          // main use-case, our minimum and expected values are greater than 0 and are not equal, so we have three arcs

          arcColors.push(yellow);
          total = expectedValue + (minimumRequiredValue / 2 + (expectedValue - minimumRequiredValue) / 2); // pick a total that creates an arc whose length is the average of the red and yellow arc lengths
          minimumDelimiter = (minimumRequiredValue / total) * 100;
          arcDelimiters.push(minimumDelimiter);
          expectedDelimiter = (expectedValue / total) * 100;
        }
      } else {
        minimumDelimiter = 0; // no minimum value. We only have yellow and green arcs
        arcColors.push(yellow);
      }

      arcColors.push(green);
      arcDelimiters.push(expectedDelimiter);
    }

    let needleValue = (currentValue / total) * 100;

    let bottomLabel: string;
    if (isPercentageGauge) {
      bottomLabel = `${Math.floor(currentValue)}%`;
    } else if (needleValue >= expectedDelimiter) {
      bottomLabel = "Well Done!";
    } else if (needleValue >= minimumDelimiter) {
      bottomLabel = "Close...";
    } else {
      bottomLabel = "Not Yet";
    }

    // adjust the needle slightly so that the needle doesn't fall on a delimeter
    if (needleValue > 0) {
      needleValue = Math.min(needleValue + 2, 100);
    }

    return {
      options: {
        hasNeedle: true,
        needleColor: "gray",
        needleUpdateSpeed: 1000,
        needleStartValue: 0,
        arcColors,
        arcDelimiters,
      },
      needleValue,
      bottomLabelFont: 12,
      bottomLabel,
      gaugeCanvasWidth: 300,
    };
  }
}
