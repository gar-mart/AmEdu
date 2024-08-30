import { formatDate } from "@angular/common";
import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PointDetailReportItem } from "../../../../../models/point-detail-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-point-detail-table",
  templateUrl: "./point-detail-table.component.html",
  styleUrls: ["./point-detail-table.component.scss"],
})
export class PointDetailTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() schoolFilter: string | undefined;

  private reportItems: PointDetailReportItem[];

  readonly displayedColumns: string[] = [
    "studentName",
    "gradeLevel",
    "respectPoints",
    "integrityPoints",
    "stewardshipPoints",
    "engagementPoints",
    "totalPoints",
    "liveLessonPoints",
    "communicationPoints",
    "schoolYearRange",
  ];

  loading = true;
  dataSource = new MatTableDataSource();

  constructor(private staffService: StaffService) {}

  ngOnChanges(changes: any): void {
    if (changes.startDate || changes.endDate) {
      this.fetchData();
    } else {
      this.filterRecords();
    }
  }

  private fetchData() {
    this.loading = true;
    this.staffService
      .returnPointDetailReport(this.startDate, this.endDate, this.schoolFilter)
      .subscribe(reportItems => {
        this.reportItems = reportItems;

        this.filterRecords();
      })
      .add(() => (this.loading = false));
  }

  private filterRecords() {
    if (!this.reportItems) {
      return;
    }
    this.dataSource = new MatTableDataSource(this.reportItems.filter(reportItem => this.filterRecord(reportItem)));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filterRecord(reportItem: PointDetailReportItem): boolean {
    if (this.schoolFilter && this.schoolFilter != "All") {
      if (!reportItem.studentEmail.toLowerCase().includes(this.schoolFilter)) {
        return false;
      }
    }

    if (
      this.gradeLevelFilter &&
      this.gradeLevelFilter.length !== 0 &&
      !this.gradeLevelFilter.includes(reportItem.gradeLevel)
    ) {
      return false;
    }

    return true;
  }

  formatDate(start: string, end: string): string {
    return new Date(start).toLocaleDateString() + " - " + new Date(end).toLocaleDateString();
  }

  getFileName(): string {
    return "RISE Points - " + formatDate(new Date(), "MMM d, yyyy", "en-US");
  }
}
