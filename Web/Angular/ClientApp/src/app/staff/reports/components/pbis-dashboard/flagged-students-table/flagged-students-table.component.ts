import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { FlaggedStudentReportItem } from "../../../../../models/flagged-student-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-flagged-students-table",
  templateUrl: "./flagged-students-table.component.html",
  styleUrls: ["./flagged-students-table.component.scss"],
})
export class FlaggedStudentsTableComponent implements OnChanges {
  @Input() schoolFilter: string | undefined;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() mentorFilter: string | undefined;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns: string[] = ["studentName", "gradeLevel", "weekOfDate", "mentorName", "level"];

  studentInterventions: FlaggedStudentReportItem[];
  dataSource = new MatTableDataSource();

  loading = true;

  constructor(private staffService: StaffService, private appComponent: AppComponent) {}

  fetchData(): void {
    if (!this.startDate || !this.endDate) {
      return;
    }
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnFlaggedStudentsReport(this.startDate, this.endDate)
      .subscribe(result => {
        this.studentInterventions = result;
        this.filterRecords();
        this.appComponent.isBusy = false;
      })
      .add(() => (this.loading = false));
  }

  ngOnChanges(changes: any): void {
    if (changes.startDate || changes.endDate) {
      this.fetchData();
    } else {
      this.filterRecords();
    }
  }

  private filterRecords(): void {
    this.dataSource = new MatTableDataSource(
      this.studentInterventions.filter(reportItem => this.filterRecord(reportItem))
    );
    this.dataSource.sort = this.sort;
  }

  private filterRecord(reportItem: FlaggedStudentReportItem): boolean {
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
