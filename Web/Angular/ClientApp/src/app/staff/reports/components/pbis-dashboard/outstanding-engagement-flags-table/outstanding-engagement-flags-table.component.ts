import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "../../../../../app.component";
import { EngagementFlagReportItem } from "../../../../../models/engagement-flag-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-outstanding-engagement-flags-table",
  templateUrl: "./outstanding-engagement-flags-table.component.html",
  styleUrls: ["./outstanding-engagement-flags-table.component.scss"],
})
export class OutstandingEngagementFlagsTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() schoolFilter: string | undefined;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() mentorFilter: string | undefined;
  @Input() startDate: Date;
  @Input() endDate: Date;

  private engagementFlagReportItems: EngagementFlagReportItem[];

  readonly displayedColumns: string[] = ["studentName", "gradeLevelValue", "mentorName", "weekOfDate"];

  loading = true;
  dataSource = new MatTableDataSource();

  constructor(private staffService: StaffService, private appComponent: AppComponent) {}

  ngOnChanges(changes: any): void {
    if (changes.startDate || changes.endDate) {
      this.fetchData();
    } else {
      this.filterRecords();
    }
  }

  private fetchData() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    this.loading = true;
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnOutstandingEngagementFlagReportItems(this.startDate, this.endDate)
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

  private filterRecords() {
    if (this.engagementFlagReportItems === undefined) {
      return;
    }
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
