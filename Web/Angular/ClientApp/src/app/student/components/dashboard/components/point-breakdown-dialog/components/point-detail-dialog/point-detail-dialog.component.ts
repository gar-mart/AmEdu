import { Component, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { PointsType } from "app/enums";
import { Student } from "app/models";
import { StudentService } from "app/student/services";

@Component({
  templateUrl: "./point-detail-dialog.component.html",
  styleUrls: ["./point-detail-dialog.component.scss"],
})
export class PointDetailDialogComponent implements OnInit {
  // global properties
  PointsType = PointsType;

  // input properties
  student: Student;
  pointsType: PointsType;
  title: string;

  // state
  loading = false;

  // DataTable properties
  displayedColumns: string[] = ["date", "value", "staffName", "comments"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appComponent: AppComponent,
    private dialogRef: MatDialogRef<PointDetailDialogComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; pointsType: PointsType }
  ) {
    this.student = data.student;
    this.pointsType = data.pointsType;

    // set the title based on the Points Type
    switch (this.pointsType) {
      case PointsType.Lesson:
        this.title = "Live Lesson Point Breakdown";
        break;
      case PointsType.Spend:
        this.title = "Points Spent Breakdown";
        break;
      default:
        this.title = `${PointsType[this.pointsType]} Point Breakdown`;
    }
  }

  ngOnInit(): void {
    this.loading = this.appComponent.isBusy = true;
    this.studentService
      .returnPointDetails(this.student.id, this.pointsType)
      .subscribe(pointDetails => {
        this.dataSource = new MatTableDataSource(pointDetails);
        this.dataSource.sort = this.sort;

        // remove the comments column if there are no comments (some points don't allow for comments entirely)
        if (!pointDetails.some(pointDetail => !!pointDetail.comments)) {
          this.displayedColumns.pop();
        }
      })
      .add(() => {
        this.loading = this.appComponent.isBusy = false;
      });
  }

  close(): void {
    this.dialogRef.close(false);
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
