import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FormService {
  private dirtyFormCount = 0;

  get isDirty() {
    return this.dirtyFormCount > 0;
  }

  setDirtyForm(isDirty: boolean) {
    isDirty ? this.addDirtyForm() : this.removeDirtyForm();
  }

  addDirtyForm() {
    this.dirtyFormCount++;
  }

  removeDirtyForm() {
    this.dirtyFormCount = Math.max(0, this.dirtyFormCount - 1);
  }

  clearDirtyForms() {
    this.dirtyFormCount = 0;
  }
}
