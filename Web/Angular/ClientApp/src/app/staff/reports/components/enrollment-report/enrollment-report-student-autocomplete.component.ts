import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { AbstractControl, UntypedFormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Student } from "@models/student.model";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-enrollment-report-student-autocomplete",
  templateUrl: "./enrollment-report-student-autocomplete.component.html",
  styleUrls: ["./enrollment-report-student-autocomplete.component.scss"],
})
export class EnrollmentReportStudentAutocompleteComponent {
  @Input() allStudents: Student[];
  @Input() control: AbstractControl;

  @ViewChild("studentInput") studentInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  studentCtrl = new UntypedFormControl();
  filteredStudents: Observable<Student[]>;

  constructor() {
    this.filteredStudents = this.studentCtrl.valueChanges.pipe(
      startWith(null as Student),
      map((student: string | null) => (student ? this._filter(student) : this.allStudents.slice()))
    );
  }

  remove(student: Student): void {
    const students: Student[] = this.control.value || [];
    const index = students.indexOf(student);

    if (index >= 0) {
      students.splice(index, 1);
    }

    this.control.setValue(students);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const students: Student[] = this.control.value || [];
    students.push(event.option.value as Student);
    this.control.setValue(students);

    this.studentInput.nativeElement.value = "";
    this.studentCtrl.setValue(null);
  }

  private _filter(value: string | Student): Student[] {
    let filterValue = "";
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    }

    return this.allStudents.filter(student => student.name.toLowerCase().includes(filterValue));
  }
}
