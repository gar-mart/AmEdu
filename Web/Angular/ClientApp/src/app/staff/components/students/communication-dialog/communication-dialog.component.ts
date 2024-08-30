import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Student } from "@models/student.model";
import { AppComponent } from "../../../../app.component";
import { CommunicationType } from "../../../../enums";
import { Communication } from "../../../../models/communication.model";
import { StaffService } from "../../../services";

@Component({
  selector: "app-communication-dialog",
  templateUrl: "./communication-dialog.component.html",
  styleUrls: ["./communication-dialog.component.scss"],
})
export class CommunicationDialogComponent implements AfterViewInit {
  @ViewChild("formDirective") private formDirective: NgForm;
  @ViewChild("notes") private notes: ElementRef<HTMLInputElement>;
  communicationForm: UntypedFormGroup;

  communicationTypeKeys;
  CommunicationType = CommunicationType; // save type to psuedo-type field to use in html
  minDate = new Date("2020-1-1");
  maxDate = new Date();

  saving = false;

  constructor(
    private appComponent: AppComponent,
    private staffService: StaffService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CommunicationDialogComponent>,
    formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { student: Student; communication: Communication }
  ) {
    if (!data || !data.student) {
      throw "Communication Dialog Expects Student Data";
    }

    this.communicationTypeKeys = Object.keys(this.CommunicationType)
      .filter(k => !isNaN(Number(k)))
      .sort((a, b) => CommunicationType[a].localeCompare(CommunicationType[b]));
    if (!data.communication) {
      // create communication
      const now = new Date();
      data.communication = {
        id: 0,
        type: this.communicationTypeKeys.filter(value => value === CommunicationType.GoogleChat.toString())[0],
        date: now,
        time: now.getHours() + ":" + now.getMinutes(),
        notes: "Progress check in",
        wasSuccessful: true,
        awardPoint: true,
      };
    } else {
      // update communication - fixup values to work with form
      data.communication.type = this.communicationTypeKeys.filter(
        value => value === data.communication.type.toString()
      )[0];
      data.communication.date = new Date(data.communication.date);
      data.communication.time = data.communication.date.getHours() + ":" + data.communication.date.getMinutes();
    }

    this.communicationForm = formBuilder.group({
      id: [data.communication.id],
      userId: [data.student.id],
      type: [data.communication.type, Validators.required],
      date: [data.communication.date, Validators.required],
      time: [data.communication.time, Validators.required],
      notes: [data.communication.notes, Validators.required],
      wasSuccessful: [data.communication.wasSuccessful.toString(), Validators.required],
      awardPoint: [data.communication.awardPoint.toString(), Validators.required],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.notes.nativeElement.select());
  }

  confirm(): void {
    if (this.saving) {
      return;
    }

    if (this.communicationForm.valid) {
      this.saving = true;
      this.appComponent.isBusy = true;

      const item: Communication = Object.assign({}, this.communicationForm.value);
      item.wasSuccessful = JSON.parse(item.wasSuccessful.toString());
      item.awardPoint = JSON.parse(item.awardPoint.toString());
      item.staffId = 0;
      item.type = +item.type;

      if (!item.wasSuccessful) {
        item.awardPoint = false; // can't award points if not successful
      }

      if (item.id === 0) {
        this.staffService.createCommunication(item).subscribe(result => {
          if (result <= 0) {
            this.saving = false;
            this.appComponent.isBusy = false;
            this.snackBar.open("Failed to create communication entry", "Close", {
              panelClass: "success",
              duration: 3500,
            });
          } else {
            this.formDirective.resetForm();
            this.saving = false;
            this.appComponent.isBusy = false;
            item.id = result;
            this.dialogRef.close(item);
          }
        });
      } else {
        this.staffService.updateCommunication(item).subscribe(result => {
          if (!result) {
            this.saving = false;
            this.appComponent.isBusy = false;
            this.snackBar.open("Failed to update communication entry", "Close", {
              panelClass: "success",
              duration: 3500,
            });
          } else {
            this.formDirective.resetForm();
            this.saving = false;
            this.appComponent.isBusy = false;
            this.dialogRef.close(item);
          }
        });
      }
    }
  }

  cancel(): void {
    this.formDirective.resetForm();
    this.dialogRef.close();
  }

  showAwardPointOptions(): boolean {
    return JSON.parse(this.communicationForm.controls["wasSuccessful"].value);
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
