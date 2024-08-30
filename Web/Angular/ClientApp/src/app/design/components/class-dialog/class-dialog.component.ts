import { Component, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { Trend } from "app/enums";
import { ClassUser, Student } from "app/models";
import { CommonService } from "app/services";
import { Utility } from "app/shared";
import { EnrollmentStatus } from "../../../enums/enrollment-status.enum";

@Component({
  selector: "app-class-dialog-dialog",
  templateUrl: "./class-dialog.component.html",
  styleUrls: ["./class-dialog.component.scss"],
})
export class ClassDialogComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  Utility = Utility;
  Trend = Trend;
  noResultsMessage = "Loading...";
  title: string;
  isPerformance: boolean;

  student: Student;
  startDate: Date;
  endDate: Date;

  dateRangeColumns: string[] = ["className", "liveLessonPoints", "onlineHoursSpentThisWeek"];
  allTimeColumns: string[] = ["totalSecondsSpentOnline", "score"];
  dataSource = new MatTableDataSource<ClassUser>();

  get isCurrent(): boolean {
    const today = new Date();
    return !this.startDate || this.endDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  get asOfDate(): Date | null {
    const asOfDate = this.dataSource.data[0]?.asOfDate;
    return asOfDate ? new Date(asOfDate) : null;
  }

  constructor(
    public appComponent: AppComponent,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; startDate?: Date; endDate?: Date }
  ) {
    if (!data || !data.student) {
      throw "Class Dialog Expects Student";
    }

    this.student = data.student;
    this.isPerformance = !data.endDate;

    if (this.isPerformance) {
      this.title = `Performance Snapshot`;
      this.startDate = Utility.getBeginningOfWeek();
      this.endDate = Utility.getEndOfWeek();
    } else {
      this.title = `${this.student.name} Performance Snapshot`;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.dateRangeColumns.push(
        "assignmentsAssignedDateRange",
        "assignmentsCompletedDateRange",
        "assignmentsCompletedOnTime"
      );
      this.allTimeColumns.push(
        "assignmentsCompletedUpUntilEndDate",
        this.allTimeColumns.shift(),
        "assignmentsInGracePeriod",
        this.allTimeColumns.pop(),
        "status"
      );
    }
  }

  ngOnInit() {
    this.appComponent.isBusy = true;
    this.commonService
      .returnClassUsersByStudentId(this.student.id, this.startDate, this.endDate)
      .subscribe(studentClasses => {
        if (this.isPerformance) {
          studentClasses = studentClasses.filter(studentClass => studentClass.status === EnrollmentStatus.Active);
        }

        this.dataSource = new MatTableDataSource(studentClasses);
        this.dataSource.sort = this.sort;
        this.appComponent.isBusy = false;
        this.noResultsMessage = "No classes found.";
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  getStatusName(classUser: ClassUser): string {
    switch (classUser.status) {
      case EnrollmentStatus.CompletedNoCredit:
        return "Completed - No Credit";
      case EnrollmentStatus.WithdrawnFailed:
        return "Withdrawn Failed";
      default:
        return EnrollmentStatus[classUser.status];
    }
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.close();
      e.preventDefault();
    }
  }
}
