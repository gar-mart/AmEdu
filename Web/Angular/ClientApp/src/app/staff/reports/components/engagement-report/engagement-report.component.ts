import { formatDate } from "@angular/common";
import { AfterViewInit, Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EngagementMetricBreakdownDialogComponent } from "@design/engagement-metric-breakdown-dialog/engagement-metric-breakdown-dialog.component";
import { AppComponent } from "app/app.component";
import { AvatarDialogComponent, ClassDialogComponent } from "app/design";
import { EngagementReport, Student } from "app/models";
import { UserDtoInterface } from "app/modules/account/models/user-dto.model";
import { Constants, Utility } from "app/shared";
import { environment } from "environments/environment";
import { Subscription, merge } from "rxjs";
import { debounceTime, filter, map, tap } from "rxjs/operators";
import { ReportsService } from "../../services";
import { AbsencesDialogComponent } from "./components/absences-dialog/absences-dialog.component";
import { AccomodationsDialogComponent } from "./components/accomodations-dialog/accomodations-dialog.component";
import { TardiesDialogComponent } from "./components/tardies-dialog/tardies-dialog.component";

@Component({
  selector: "app-engagement-report",
  templateUrl: "./engagement-report.component.html",
  styleUrls: ["./engagement-report.component.scss"],
})
export class EngagementReportComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly subscriptions: Subscription[] = [];
  private requestIds: number[] = [];
  private nextRequestId = 1;

  readonly environment = environment;
  readonly Utility = Utility;
  readonly gradeLevels: string[] = Constants.grades;
  readonly displayedColumns: (keyof EngagementReport)[] = [
    "name",
    "liveLessonPoints",
    "communicationPoints",
    "onlineHoursSpent",
    "failingGrades",
    "assignmentsAssignedDateRange",
    "assignmentsCompletedDateRange",
    "assignmentsCompletedOnTime",
    "numAbsences",
    "assignmentsCompletedUpUntilEndDate",
    "assignmentsInGracePeriod",
    "isActive",
  ];
  readonly pageSizes = [10, 50, 100];
  pageSize = +localStorage.getItem("engagement-report-items-per-page") || this.pageSizes[1];

  studentNameFilter = new UntypedFormControl();
  gradeLevelFilter = new UntypedFormControl();
  schoolFilter = new UntypedFormControl();
  myStudentsFilter = new UntypedFormControl();
  startDateFilter = new UntypedFormControl();
  endDateFilter = new UntypedFormControl();
  enrollmentStatusFilter = new UntypedFormControl();
  loading = true;

  user: UserDtoInterface;
  students: EngagementReport[];

  dataSource = new MatTableDataSource();
  noResultsMessage = "Loading...";

  constructor(
    public appComponent: AppComponent,
    private reportsService: ReportsService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    // set default filter values
    this.gradeLevelFilter.patchValue("All");
    this.schoolFilter.patchValue("AmEdustudents.org");
    this.enrollmentStatusFilter.patchValue(true);
    this.myStudentsFilter.patchValue(true);
    this.setDateRangeFilters();
  }

  ngAfterViewInit() {
    const startDateValueChanges$ = this.startDateFilter.valueChanges.pipe(
      map(value => {
        if (value > this.endDateFilter.value) {
          const newEndDate = new Date(value);
          newEndDate.setDate(value.getDate() + 7);
          this.endDateFilter.patchValue(newEndDate);
          return false;
        }

        return true;
      })
    );

    const endDateValueChanges$ = this.endDateFilter.valueChanges.pipe(
      map(value => {
        if (value < this.startDateFilter.value) {
          const newStartDate = new Date(value);
          newStartDate.setDate(value.getDate() - 7);
          this.startDateFilter.patchValue(newStartDate);
          return false;
        }
        return true;
      })
    );

    const filterValueChanges$ = merge(
      this.studentNameFilter.valueChanges,
      this.gradeLevelFilter.valueChanges,
      this.schoolFilter.valueChanges,
      this.enrollmentStatusFilter.valueChanges,
      this.myStudentsFilter.valueChanges
    ).pipe(map(() => true));

    const sortChange$ = this.sort.sortChange.pipe(map(() => true));

    const filter$ = merge(filterValueChanges$, startDateValueChanges$, endDateValueChanges$, sortChange$).pipe(
      filter(x => x),
      tap(() => this.paginator.firstPage())
    );

    const pagination$ = this.paginator.page.pipe(
      tap(page => localStorage.setItem("engagement-report-items-per-page", page.pageSize.toString()))
    );

    const $reloadDataTable = merge(filter$, pagination$).pipe(
      debounceTime(500),
      tap(() => this.loadDatatable())
    );

    // set up value changes events
    this.subscriptions.push($reloadDataTable.subscribe());

    this.loadDatatable(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  openMetricDialog(row: EngagementReport, metric: keyof EngagementReport) {
    this.dialog.open(EngagementMetricBreakdownDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        metric,
        studentId: row.id,
        studentName: row.name,
        startDate: this.startDateFilter.value,
        endDate: this.endDateFilter.value,
      },
    });
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

  openAccomodationsDialog(student: Student) {
    this.dialog.open(AccomodationsDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
      },
    });
  }

  openAbsencesDialog(student: Student) {
    this.dialog.open(AbsencesDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
        startDate: this.startDateFilter.value,
        endDate: this.endDateFilter.value,
      },
    });
  }

  openTardiesDialog(student: Student) {
    this.dialog.open(TardiesDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
        startDate: this.startDateFilter.value,
        endDate: this.endDateFilter.value,
      },
    });
  }

  openClassDialog(student: Student) {
    this.dialog.open(ClassDialogComponent, {
      minWidth: "500px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student,
        startDate: this.startDateFilter.value,
        endDate: this.endDateFilter.value,
      },
    });
  }

  exportToExcel(student: Student) {
    const studentId = student.id;
    const studentName = student.name;
    const startDate = this.startDateFilter.value;
    const endDate = this.endDateFilter.value;
    student.isExporting = this.appComponent.isBusy = true;
    this.reportsService.exportEngagementReportExcel(startDate, endDate, studentId).subscribe(data => {
      const blob = new Blob([data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      const startDateFormat = formatDate(startDate, "yyyyMMdd", this.locale);
      const endDateFormat = formatDate(endDate, "yyyyMMdd", this.locale);

      link.download = `Engagement Report - ${studentName.replace(",", " ")} - ${startDateFormat} ${endDateFormat}.xlsx`;
      link.click();
      student.isExporting = this.appComponent.isBusy = false;
    });
  }

  exportToPdf(student: Student) {
    const studentId = student.id;
    const studentName = student.name;
    student.isExporting = this.appComponent.isBusy = true;
    const startDate = this.startDateFilter.value;
    const endDate = this.endDateFilter.value;
    this.reportsService.exportEngagementReportPdf(startDate, endDate, studentId).subscribe(data => {
      const blob = new Blob([data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      const startDateFormat = formatDate(startDate, "yyyyMMdd", this.locale);
      const endDateFormat = formatDate(endDate, "yyyyMMdd", this.locale);

      link.download = `Engagement Report - ${studentName.replace(",", " ")} - ${startDateFormat} ${endDateFormat}.pdf`;
      link.click();
      student.isExporting = this.appComponent.isBusy = false;
    });
  }

  private loadDatatable(initializing?: boolean) {
    if (!this.startDateFilter.value || !this.endDateFilter.value) {
      return;
    }

    this.appComponent.isBusy = initializing !== true;
    this.loading = true;

    // assign this request an ID so we can ignore the response if more requests come in to avoid having the table get re-rendered more times than necessary
    const requestId = this.nextRequestId++;
    this.requestIds.push(requestId);

    const startDate = this.startDateFilter.value;
    const endDate = this.endDateFilter.value;
    this.reportsService
      .returnEngagementReport(
        startDate,
        endDate,
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        this.studentNameFilter.value,
        this.gradeLevelFilter.value,
        this.enrollmentStatusFilter.value,
        this.myStudentsFilter.value,
        this.schoolFilter.value,
        this.sort.active,
        this.sort.direction
      )
      .subscribe(report => {
        // make sure this request hasn't been cancelled
        if (this.requestIds.some(id => id === requestId)) {
          // keep any more recent requests in the pipeline
          this.requestIds = this.requestIds.filter(id => id > requestId);

          // if there are any more recent requests, then do nothing
          if (!this.requestIds.length) {
            this.students = report.items;
            this.user = this.reportsService.user;
            this.dataSource = new MatTableDataSource(this.students);
            this.paginator.length = report.total;
            this.noResultsMessage = "No students found. Adjust your filters.";
            this.appComponent.isBusy = false;
            this.loading = false;
          }
        }
      });
  }

  private setDateRangeFilters() {
    const now = new Date();
    const startDate = Utility.getBeginningOfWeek();
    const endDate = new Date(startDate);

    if (now.getDay() < 3 || (now.getDay() >= 5 && now >= startDate)) {
      // .getDay() returns 3 for Wednesday and 5 for Friday
      startDate.setDate(startDate.getDate() - 7);
    } else {
      endDate.setDate(startDate.getDate() + 7);
    }

    endDate.setDate(endDate.getDate() - 1); // AmEdu wants to see Monday - Sunday not Monday - Monday

    this.startDateFilter.patchValue(startDate);
    this.endDateFilter.patchValue(endDate);
  }
}
