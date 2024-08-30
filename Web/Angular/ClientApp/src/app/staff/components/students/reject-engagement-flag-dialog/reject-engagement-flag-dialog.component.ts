import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppComponent } from "app/app.component";
import { EngagementFlag } from "app/models";
import { StaffService } from "../../../services";

@Component({
  selector: "app-reject-engagement-flag-dialog",
  templateUrl: "./reject-engagement-flag-dialog.component.html",
  styleUrls: ["./reject-engagement-flag-dialog.component.scss"],
})
export class RejectEngagementFlagDialogComponent implements AfterViewInit {
  @ViewChild("formDirective") private formDirective: NgForm;
  @ViewChild("reason") private reason: ElementRef<HTMLTextAreaElement>;
  form: UntypedFormGroup;

  engagementFlag: EngagementFlag;
  saving = false;

  constructor(
    private appComponent: AppComponent,
    private staffService: StaffService,
    formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RejectEngagementFlagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: EngagementFlag
  ) {
    if (!data || !data.id) {
      throw "RejectEngagementFlagDialogComponent Expects EngagementFlag";
    }

    this.engagementFlag = data;

    this.form = formBuilder.group({
      id: [this.engagementFlag.id],
      approvedStatus: [false],
      rejectedReason: [null, [Validators.required, Validators.maxLength(250)]],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.reason.nativeElement.select());
  }

  confirm(): void {
    if (this.saving) {
      return;
    }

    if (this.form.valid) {
      this.saving = true;

      const engagementFlag: EngagementFlag = Object.assign({}, this.form.value);

      this.appComponent.isBusy = true;
      this.staffService.updateEngagementFlag(engagementFlag).subscribe(() => {
        this.appComponent.isBusy = false;
        this.dialogRef.close(this.form.value);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.confirm();
      e.preventDefault();
    }
  }
}
