import { FormGroupDirective, NgForm, UntypedFormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class DirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl, form: FormGroupDirective | NgForm): boolean {
    return control && control.invalid && (control.dirty || (form && form.submitted));
  }
}
