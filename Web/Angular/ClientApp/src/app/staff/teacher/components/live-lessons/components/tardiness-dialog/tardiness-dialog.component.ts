import { Component, HostListener, Inject } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tardy } from "app/enums";
import { Tardiness } from "app/models";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tardiness-dialog",
  templateUrl: "./tardiness-dialog.component.html",
  styleUrls: ["./tardiness-dialog.component.scss"],
})
export class TardinessDialogComponent {
  form: UntypedFormGroup;
  title: string;
  Tardy = Tardy;
  tardiness: Tardiness;
  subscriptions: Subscription[] = [];

  constructor(
    private dialogRef: MatDialogRef<TardinessDialogComponent>,
    formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { studentName: string; tardiness: Tardiness }
  ) {
    this.title = `Edit Tardiness for ${data.studentName}`;
    this.tardiness = data.tardiness;

    this.form = formBuilder.group({
      type: data.tardiness.type || Tardy.Late,
      comment: [
        data.tardiness.comment,
        data.tardiness.type === Tardy.Disengaged
          ? [Validators.maxLength(500), Validators.required]
          : [Validators.maxLength(500)],
      ],
    });

    this.subscriptions.push(
      this.form.controls.type.valueChanges.subscribe(x => {
        if (x === Tardy.Disengaged) {
          this.form.controls.comment.setValidators([Validators.maxLength(500), Validators.required]);
        } else {
          this.form.controls.comment.setValidators([Validators.maxLength(500)]);
        }
        this.form.controls.comment.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  textAreaPlaceHolder() {
    return this.form.controls.comment.value === Tardy.Disengaged ? "Comments" : "Comments (optional)";
  }

  delete(): void {
    this.tardiness.type = null;
    this.tardiness.comment = null;
    this.dialogRef.close(this.tardiness);
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    this.tardiness.comment = this.form.controls["comment"].value;
    this.tardiness.type = this.form.controls["type"].value;

    this.dialogRef.close(this.tardiness);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.save();
      e.preventDefault();
    }
  }
}
