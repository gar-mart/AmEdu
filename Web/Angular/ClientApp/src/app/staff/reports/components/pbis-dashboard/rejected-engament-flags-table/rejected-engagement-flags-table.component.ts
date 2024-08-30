import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "../../../../../app.component";
import { EngagementFlagReportItem } from "../../../../../models/engagement-flag-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-rejected-engagement-flags-table",
  templateUrl: "./rejected-engagement-flags-table.component.html",
  styleUrls: ["./rejected-engagement-flags-table.component.scss"],
})
export class RejectedEngagementFlagsTableComponent implements OnChanges {
  @Input() schoolFilter: string | undefined;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() mentorFilter: string | undefined;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private engagementFlagReportItems: EngagementFlagReportItem[];

  readonly displayedColumns: string[] = [
    "studentName",
    "gradeLevelValue",
    "mentorName",
    "weekOfDate",
    "rejectedReason",
  ];

  loading = true;
  dataSource = new MatTableDataSource();

  constructor(private staffService: StaffService, private appComponent: AppComponent) {}

  private fetchData() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnRejectedEngagementFlagReportItems(this.startDate, this.endDate)
      .subscribe(reportItems => {
        this.engagementFlagReportItems = reportItems.map(r => {
          r["gradeLevelValue"] = +r.gradeLevel > 0 ? +r.gradeLevel : 0;
          return r;
        });

        this.filterRecords();
        this.appComponent.isBusy = false;
      })
      .add(() => (this.loading = false));
  }

  ngOnChanges(changes: any): void {
    if (changes.startDate !== undefined && changes.endDate !== undefined) {
      this.fetchData();
    } else {
      this.filterRecords();
    }
  }

  private filterRecords() {
    this.dataSource = new MatTableDataSource(
      this.engagementFlagReportItems.filter(reportItem => this.filterRecord(reportItem))
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filterRecord(reportItem: EngagementFlagReportItem): boolean {
    if (this.schoolFilter && this.schoolFilter != "All") {
      if (!reportItem.studentEmail.toLowerCase().includes(this.schoolFilter)) {
        return false;
      }
    }
    if (
      this.gradeLevelFilter &&
      this.gradeLevelFilter.length !== 0 &&
      !this.gradeLevelFilter.some(sg => this.gradeLevelFilter.includes(reportItem.gradeLevel))
    ) {
      return false;
    }

    if (this.mentorFilter) {
      if (reportItem.mentorName === undefined) {
        return false;
      }
      const adjustedName = this.mentorFilter.split(",")[1].trim() + " " + this.mentorFilter.split(",")[0].trim();
      if (reportItem.mentorName !== adjustedName) {
        return false;
      }
    }
    return true;
  }
}
