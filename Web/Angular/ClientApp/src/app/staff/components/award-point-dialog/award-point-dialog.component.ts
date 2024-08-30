import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppComponent } from "app/app.component";
import { PointsType } from "app/enums";
import { Points, Student } from "app/models";
import { StaffService } from "app/staff/services";

@Component({
  selector: "app-award-point-dialog",
  templateUrl: "./award-point-dialog.component.html",
  styleUrls: ["./award-point-dialog.component.scss"],
})
export class AwardPointDialogComponent implements AfterViewInit {
  @ViewChild("comments") private comments: ElementRef<HTMLTextAreaElement>;
  form: UntypedFormGroup;
  title: string;
  deferUpdateToCaller: boolean;
  points: Points;

  constructor(
    public appComponent: AppComponent,
    private staffService: StaffService,
    private dialogRef: MatDialogRef<AwardPointDialogComponent>,
    formBuilder: UntypedFormBuilder,
    // passing a destructured object with default properties syntax
    @Inject(MAT_DIALOG_DATA)
    { student, points, deferUpdateToCaller = true }: { student: Student; points: Points; deferUpdateToCaller?: boolean }
  ) {
    this.points = points;
    this.deferUpdateToCaller = deferUpdateToCaller;

    const pointsType = PointsType[points.type];

    if (this.points.value < 0) {
      const absAmount = Math.abs(this.points.value);
      this.title = `Remove ${absAmount} ${pointsType} Point${absAmount > 1 ? "s" : ""} from ${student.name}`;
    } else {
      this.title = `Award ${this.points.value} ${pointsType} Point${this.points.value > 1 ? "s" : ""} to ${
        student.name
      }`;
    }

    this.form = formBuilder.group({ comments: [points.comments, Validators.maxLength(500)] });
  }

  ngAfterViewInit() {
    setTimeout(() => this.comments.nativeElement.select());
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    this.points.comments = this.form.controls["comments"].value;

    if (this.deferUpdateToCaller) {
      this.dialogRef.close(true);
    } else {
      this.appComponent.isBusy = true;
      this.staffService.createPoints(this.points).subscribe(() => {
        this.appComponent.isBusy = false;
        this.dialogRef.close(true);
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
      this.save();
      e.preventDefault();
    }
  }
}
