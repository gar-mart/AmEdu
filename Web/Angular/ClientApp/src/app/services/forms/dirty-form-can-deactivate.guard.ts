import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DirtyFormDialogComponent } from "src/app/components/dirty-form-dialog/dirty-form-dialog.component";
import { FdDialog } from "../fd-dialog.service";
import { FormService } from "./form.service";

@Injectable({ providedIn: "root" })
export class DirtyFormCanDeactivateGuard implements CanDeactivate<object> {
  private $confirmation: Observable<boolean>;

  constructor(private formService: FormService, private dialog: FdDialog) {}

  canDeactivate() {
    if (!this.formService.isDirty) {
      return true;
    }

    if (!this.$confirmation) {
      // this condition protects against opening several dirty form dialogs if more than one component happens to be deactivated
      this.$confirmation = this.dialog
        .open(DirtyFormDialogComponent, {
          fragment: null, // not applicable
        })
        .beforeClosed()
        .pipe(
          tap(deactivate => {
            if (deactivate) {
              this.formService.clearDirtyForms();
            }
            this.$confirmation = null;
          })
        );
    }

    return this.$confirmation;
  }
}
