import { formatDate } from "@angular/common";
import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EngagementMetricColumn, EngagementMetricData } from "@models/engagement-metric.model";
import { EngagementReport } from "@models/engagement-report.model";
import { StaffService } from "app/staff/services";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-engagement-metric-breakdown-dialog",
  templateUrl: "./engagement-metric-breakdown-dialog.component.html",
  styleUrls: ["./engagement-metric-breakdown-dialog.component.scss"],
})
export class EngagementMetricBreakdownDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  showDateRange = true;
  title = this.getTitle();
  loading = true;

  columns: EngagementMetricColumn[] = [];
  columnOrder: string[] = [];
  dataSource = new MatTableDataSource<EngagementMetricData>();

  get exportFileName() {
    const fileName = [this.title, this.data.studentName];

    if (this.showDateRange) {
      const dateRange = [formatDate(this.data.endDate, "mediumDate", "en-US")];

      if (this.data.startDate) {
        dateRange.unshift(formatDate(this.data.startDate, "mediumDate", "en-US"));
      }

      fileName.push(dateRange.join(" - "));
    }

    return fileName.join(" - ");
  }

  constructor(
    private staffService: StaffService,
    public dialogRef: MatDialogRef<EngagementMetricBreakdownDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      studentId: number;
      studentName: string;
      metric: keyof EngagementReport;
      startDate: Date;
      endDate: Date;
    }
  ) {}

  ngOnInit(): void {
    this.staffService
      .returnEngagementMetricData(this.data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(result => {
        this.columns = result.columns;
        this.columnOrder = result.columns.map(c => c.property);
        this.dataSource.data = result.data;

        // after the data has been retrieved, update the start/end dates to match the metric
        if (this.data.metric === "assignmentsCompletedUpUntilEndDate") {
          this.showDateRange = true;
          this.data.startDate = null;
        }
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e: KeyboardEvent) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.dialogRef.close();
      e.preventDefault();
    }
  }

  private getTitle() {
    switch (this.data.metric) {
      case "liveLessonPoints":
        return "Live Lessons";
      case "communicationPoints":
        return "Communications";
      case "onlineHoursSpent":
        return "Online Time";
      case "failingGrades":
        return "Classes Failing";
      case "assignmentsAssignedDateRange":
        return "Tasks Assigned";
      case "assignmentsCompletedDateRange":
        return "Completed In Grace";
      case "assignmentsCompletedOnTime":
        return "Completed On Time";
      case "assignmentsCompletedUpUntilEndDate":
        this.showDateRange = false;
        return "Completed In Grace";
      case "assignmentsInGracePeriod":
        this.showDateRange = false;
        return "Assignments In Grace Period";
      default:
        throw new Error("Invalid metric: " + this.data.metric);
    }
  }
}
