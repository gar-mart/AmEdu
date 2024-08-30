import { Component, Inject, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Staff } from "@models/staff.model";
import { AdminService } from "@services/admin.service";
import { AppComponent } from "app/app.component";
import { Constants, Utility } from "app/shared";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-staff-dialog",
  templateUrl: "./edit-staff-dialog.component.html",
  styleUrls: ["./edit-staff-dialog.component.scss"],
})
export class EditStaffDialogComponent implements OnDestroy {
  readonly urlPrefix = Constants.youtubeUrlPrefix;

  staffMember: Staff;
  form: UntypedFormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private appComponent: AppComponent,
    private dialogRef: MatDialogRef<EditStaffDialogComponent>,
    formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { staffMember: Staff }
  ) {
    this.staffMember = data.staffMember;

    const introVideo = this.staffMember.introVideoId ? `${this.urlPrefix}${this.staffMember.introVideoId}` : "";

    this.form = formBuilder.group({
      id: new UntypedFormControl(this.staffMember.id),
      mentorGrades: new UntypedFormControl(this.staffMember.mentorGrades),
      counselorGrades: new UntypedFormControl(this.staffMember.counselorGrades),
      appointmentLink: new UntypedFormControl(this.staffMember.appointmentLink, [
        Utility.urlValidator,
        Validators.maxLength(500),
      ]),
      introVideo: new UntypedFormControl(introVideo),
      introVideoId: new UntypedFormControl(this.staffMember.introVideoId),
    });

    this.subscriptions.push(
      this.form.controls.introVideo.valueChanges.subscribe(introVideo => {
        let videoId: string = null;

        if (introVideo) {
          try {
            videoId = new URL(introVideo).searchParams.get("v");
          } catch (e) {
            /* this error is handled in the following if block */
          }
          if (!videoId) {
            this.form.controls.introVideo.setErrors({ invalid: true });
            return;
          }
        }

        this.form.controls.introVideoId.patchValue(videoId);
        this.form.controls.introVideo.setErrors(null);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  updateStaff() {
    if (this.form.valid) {
      this.appComponent.isBusy = true;
      this.adminService.updateStaffMember(this.form.value).subscribe(result => {
        if (result) {
          Object.assign(this.staffMember, this.form.value);
          this.dialogRef.close();
        }
      });
    }
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }
}
