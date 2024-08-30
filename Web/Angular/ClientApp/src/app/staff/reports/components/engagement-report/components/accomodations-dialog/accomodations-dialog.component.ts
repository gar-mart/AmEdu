import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Student } from "app/models";
import { StaffService } from "../../../../../services";

@Component({
  selector: "app-accomodations-dialog-dialog",
  templateUrl: "./accomodations-dialog.component.html",
  styleUrls: ["./accomodations-dialog.component.scss"],
})
export class AccomodationsDialogComponent implements OnInit {
  student: Student;
  accomodations: string;
  loading = true;

  displayedColumns: string[] = ["date", "className", "staffName", "type", "comment"];
  dataSource = new MatTableDataSource();

  constructor(
    private staffService: StaffService,
    private dialogRef: MatDialogRef<AccomodationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { student: Student }
  ) {
    this.student = data.student;
  }

  ngOnInit() {
    this.staffService.returnStudentSearchInformationByStudentId(this.student.id).subscribe(result => {
      this.accomodations = result.accomodations;
      this.loading = false;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
