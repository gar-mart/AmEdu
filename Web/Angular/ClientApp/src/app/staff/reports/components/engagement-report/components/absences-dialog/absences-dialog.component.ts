import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Student } from "../../../../../../models";
import { Absence } from "../../../../../../models/absence";
import { TeacherService } from "../../../../../teacher";

@Component({
  selector: "app-absences-dialog",
  templateUrl: "./absences-dialog.component.html",
  styleUrls: ["./absences-dialog.component.scss"],
})
export class AbsencesDialogComponent {
  student: Student;
  startDate: Date;
  endDate: Date;

  loading = true;

  displayedColumns: string[] = ["startDate", "reason", "userName"];
  dataSource = new MatTableDataSource();

  constructor(
    private teacherService: TeacherService,
    private dialogRef: MatDialogRef<AbsencesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; startDate: Date; endDate: Date }
  ) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.student = data.student;
  }

  ngOnInit() {
    this.teacherService
      .returnAbsences(this.student.id, this.startDate, this.endDate)
      .subscribe((absences: Absence[]) => {
        this.dataSource = new MatTableDataSource(absences);
        this.loading = false;
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
