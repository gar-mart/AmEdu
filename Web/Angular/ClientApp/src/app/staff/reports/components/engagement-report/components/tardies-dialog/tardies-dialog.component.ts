import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Tardy } from "app/enums";
import { Student, Tardiness } from "app/models";
import { ReportsService } from "app/staff/reports/services";

@Component({
  selector: "app-tardies-dialog-dialog",
  templateUrl: "./tardies-dialog.component.html",
  styleUrls: ["./tardies-dialog.component.scss"],
})
export class TardiesDialogComponent implements OnInit {
  student: Student;
  startDate: Date;
  endDate: Date;

  Tardy = Tardy;
  loading = true;

  displayedColumns: string[] = ["date", "className", "staffName", "type", "comment"];
  dataSource = new MatTableDataSource();

  constructor(
    private reportsService: ReportsService,
    private dialogRef: MatDialogRef<TardiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; startDate: Date; endDate: Date }
  ) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.student = data.student;
  }

  ngOnInit() {
    this.reportsService
      .returnTardies(this.student.id, this.startDate, this.endDate)
      .subscribe((tardies: Tardiness[]) => {
        this.dataSource = new MatTableDataSource(tardies);
        this.loading = false;
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
