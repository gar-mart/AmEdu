import { Component, Input } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { Constants } from "app/shared";

@Component({
  selector: "app-choose-a-grade",
  templateUrl: "./choose-a-grade.component.html",
  styleUrls: ["./choose-a-grade.component.scss"],
})
export class ChooseAGradeComponent {
  @Input() control: UntypedFormControl;
  @Input() appearance: MatFormFieldAppearance = "legacy";
  @Input() label = "Choose a Grade";

  elementarySchoolGrades = Constants.gradesK5;
  middleSchoolGrades = Constants.grades68;
  highSchoolGrades = Constants.grades912;

  checkGroup(change: MatButtonToggleChange, grades: string[]) {
    if (!this.control.value) {
      this.control.patchValue([]);
    }

    if (change.source.checked) {
      this.control.patchValue([...new Set([...this.control.value, ...grades])]);
    } else {
      this.control.patchValue(this.control.value.filter(v => !grades.find(g => v === g)));
    }
  }
}
