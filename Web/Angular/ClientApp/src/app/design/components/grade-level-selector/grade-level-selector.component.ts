import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Constants } from "app/shared";

type GradeOption = { value: string; selected: boolean };

@Component({
  selector: "app-grade-level-selector",
  templateUrl: "./grade-level-selector.component.html",
  styleUrls: ["./grade-level-selector.component.scss"],
})
export class GradeLevelSelectorComponent {
  @Input() label = "Grade Levels";
  @Input() set selectedGrades(value: string[]) {
    this.gradeListK5 = Constants.gradesK5.map(grade => {
      return {
        value: grade,
        selected: value.includes(grade),
      };
    });
    this.gradeList68 = Constants.grades68.map(grade => {
      return {
        value: grade,
        selected: value.includes(grade),
      };
    });
    this.gradeList912 = Constants.grades912.map(grade => {
      return {
        value: grade,
        selected: value.includes(grade),
      };
    });

    this._selectedGrades = value;
  }
  @Output() gradesSelected = new EventEmitter<string[]>();

  gradeListK5: GradeOption[];
  gradeList68: GradeOption[];
  gradeList912: GradeOption[];

  private _selectedGrades: string[];
  get selectedGrades() {
    return this._selectedGrades;
  }

  get gradesK5Selected() {
    return !this.gradeListK5.some(x => !x.selected);
  }

  get grades68Selected() {
    return !this.gradeList68.some(x => !x.selected);
  }

  get grades912Selected() {
    return !this.gradeList912.some(x => !x.selected);
  }

  toggleKThrough5() {
    if (this.gradesK5Selected) {
      this.gradesSelected.emit(...new Set([this.selectedGrades.filter(g => !Constants.gradesK5.some(e => e === g))]));
    } else {
      this.gradesSelected.emit([...new Set([...this.selectedGrades, ...Constants.gradesK5])]);
    }
  }

  toggle6Through8() {
    if (this.grades68Selected) {
      this.gradesSelected.emit(...new Set([this.selectedGrades.filter(g => !Constants.grades68.some(e => e === g))]));
    } else {
      this.gradesSelected.emit([...new Set([...this.selectedGrades, ...Constants.grades68])]);
    }
  }

  toggle9Through12() {
    if (this.grades912Selected) {
      this.gradesSelected.emit(...new Set([this.selectedGrades.filter(g => !Constants.grades912.some(e => e === g))]));
    } else {
      this.gradesSelected.emit([...new Set([...this.selectedGrades, ...Constants.grades912])]);
    }
  }

  gradeSelectedChange(grade: string) {
    let outputGrades: string[];
    if (this._selectedGrades.includes(grade)) {
      //remove
      outputGrades = this._selectedGrades.filter(g => g != grade);
    } else {
      //add
      outputGrades = [...this._selectedGrades, grade];
    }

    this.gradesSelected.emit(outputGrades);
  }
}
