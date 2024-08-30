import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommunicationList, CommunicationListEntry } from "../../../../models";

@Component({
  selector: "app-save-list-dialog",
  templateUrl: "./save-list-dialog.component.html",
  styleUrls: ["./save-list-dialog.component.scss"],
})
export class SaveListDialogComponent implements AfterViewInit {
  @ViewChild("nameInput") nameInput: ElementRef;

  communicationList: CommunicationList;

  constructor(
    private dialogRef: MatDialogRef<SaveListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CommunicationListEntry[]
  ) {
    this.communicationList = { entries: data };
  }

  save() {
    if (this.communicationList.name) {
      this.dialogRef.close(this.communicationList);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.nameInput.nativeElement.select());
  }

  close() {
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
