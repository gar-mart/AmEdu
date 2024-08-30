import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EngagementFlagReportItem } from "@models/engagement-flag-report-item";
import { Constants, Utility } from "app/shared";
import { StaffService } from "app/staff/services";
import { Subscription } from "rxjs";
import { finalize, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-interventions-report",
  templateUrl: "./interventions-report.component.html",
  styleUrls: ["./interventions-report.component.scss"],
})
export class InterventionsReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly subscriptions: Subscription[] = [];
  readonly gradeLevels: string[] = Constants.grades;
  readonly displayedColumns: string[] = ["studentName", "gradeLevelValue", "mentorName", "weekOfDate"];

  private engagementFlagReportItems: EngagementFlagReportItem[];

  quickFilterFormControl = new UntypedFormControl();
  filter: UntypedFormControl = new UntypedFormControl();
  schoolYearFilter = new UntypedFormControl();
  enrollmentStatusFilter = new UntypedFormControl(true);
  schoolYears = this.schoolYearOptions();
  grades: string[] = [];

  dataSource = new MatTableDataSource();
  loading = true;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.schoolYearFilter.valueChanges.pipe(switchMap(() => this.loadData$())).subscribe(),
      this.enrollmentStatusFilter.valueChanges.pipe(switchMap(() => this.loadData$())).subscribe(),
      this.quickFilterFormControl.valueChanges.subscribe(this.filterRecords.bind(this)),
      this.filter.valueChanges.subscribe(this.filterRecords.bind(this))
    );

    this.schoolYearFilter.patchValue(this.schoolYears[0]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private filterRecords() {
    this.dataSource = new MatTableDataSource(
      this.engagementFlagReportItems.filter(reportItem => this.filterRecord(reportItem))
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filterRecord(reportItem: EngagementFlagReportItem): boolean {
    if (this.filter.value && this.filter.value.length !== 0) {
      return this.filter.value.includes(reportItem.gradeLevel);
    }

    if (this.quickFilterFormControl.value) {
      if (!reportItem.studentName.toLowerCase().includes(this.quickFilterFormControl.value)) {
        return false;
      }
    }

    return true;
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
    } while (beginningOfSchoolYear.getFullYear() >= 2021);

    return options;
  }

  private loadData$() {
    return this.staffService
      .returnEngagementFlagReportItems(this.schoolYearFilter.value, this.enrollmentStatusFilter.value)
      .pipe(
        tap(reportItems => {
          this.engagementFlagReportItems = reportItems.map(r => {
            r["gradeLevelValue"] = +r.gradeLevel > 0 ? +r.gradeLevel : 0;
            return r;
          });

          this.filterRecords();
        }),
        finalize(() => (this.loading = false))
      );
  }
}
