import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonService } from "@services/common.service";
import { Staff, Student } from "app/models";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-assign-students-to-mentor-dialog",
  templateUrl: "./assign-students-to-mentor-dialog.component.html",
  styleUrls: ["./assign-students-to-mentor-dialog.component.scss"],
})
export class AssignStudentsToMentorDialogComponent implements OnInit {
  staffMember: Staff;
  filteredStudents$: Observable<Student[]>;
  students: Student[] = [];
  assignedStudents: Student[] = [];
  visible = true;
  selectable = true;
  removable = true;
  myControl = new UntypedFormControl();

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<AssignStudentsToMentorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.staffMember = data.staffMember;
    this.students = data.studentList;
  }

  ngOnInit() {
    this.filteredStudents$ = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
    this.students.sort(this.sortStudentsBy("lastName"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  remove(student: Student): void {
    const index = this.assignedStudents.indexOf(student);
    if (index >= 0) this.assignedStudents.splice(index, 1);
  }

  add(student: Student) {
    const index = this.assignedStudents.indexOf(student);
    if (index < 0) {
      this.assignedStudents.push(student);
      this.assignedStudents.sort(this.sortStudentsBy("lastName"));
    }

    this.myControl.setValue("");
  }

  assignStudentsToMentor() {
    const studentIds: number[] = this.assignedStudents.map(x => x.id);

    this.commonService.assignStudentsToMentor(this.staffMember.id, studentIds).subscribe(result => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  displayFn(student?: Student): string | undefined {
    return student ? student.name : undefined;
  }

  sortStudentsBy(property) {
    return function (a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.assignStudentsToMentor();
      e.preventDefault();
    }
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.students.filter(
      student => student.name.toLowerCase().includes(filterValue) || student.name.toUpperCase().includes(filterValue)
    );
  }
}
