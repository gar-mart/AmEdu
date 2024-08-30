import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Attachment } from "@models/attachment.model";
import { InterventionTask } from "@models/intervention-task.model";
import { AppComponent } from "app/app.component";
import { Utility } from "app/shared";
import { InterventionService } from "app/staff/interventions/interventions.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-task-attachments",
  templateUrl: "./task-attachments.component.html",
  styleUrls: ["./task-attachments.component.scss"],
})
export class TaskAttachmentsComponent {
  @Input() canEdit: boolean;
  @Input() task: InterventionTask;
  @Input() owner: string;
  @Input() type: "email communication" | "scheduled meeting" | "success plan" | "truancy form";
  @Output() disableInput = new EventEmitter<boolean>();

  constructor(private appComponent: AppComponent, private interventionService: InterventionService) {}

  uploadAttachment(fileInputEvent: Event) {
    const fileInput = fileInputEvent.target as HTMLInputElement;
    const file = fileInput.files[0];

    Utility.setUniqueFileName(
      this.task.attachments.map(a => {
        return { name: a.fileName };
      }),
      file
    );

    this.disableInput.emit((this.appComponent.isBusy = true));

    this.uploadAttachmentTask(file)
      .subscribe(url => {
        this.task.attachments = [
          ...this.task.attachments,
          {
            url,
            contentType: file.type,
            fileName: file.name,
            allowDelete: true,
          },
        ].sort((a, b) => a.fileName.localeCompare(b.fileName));
      })
      .add(() => {
        this.disableInput.emit((this.appComponent.isBusy = false));
      });
  }

  removeAttachment(attachment: Attachment) {
    this.disableInput.emit((this.appComponent.isBusy = true));

    this.removeAttachmentTask(attachment)
      .subscribe(() => {
        this.task.attachments = this.task.attachments.filter(a => a !== attachment);
      })
      .add(() => {
        this.disableInput.emit((this.appComponent.isBusy = false));
      });
  }

  private uploadAttachmentTask(file: File): Observable<string> {
    switch (this.type) {
      case "email communication":
        return this.interventionService.uploadEmailCommunicationAttachment(this.task.interventionId, file);

      case "scheduled meeting":
        return this.interventionService.uploadScheduledMeetingAttachment(this.task.interventionId, file);

      case "success plan":
        return this.interventionService.uploadSuccessPlanAttachment(this.task.interventionId, file);

      case "truancy form":
        return this.interventionService.uploadTruancyFormAttachment(this.task.interventionId, file);
    }
  }

  private removeAttachmentTask(attachment: Attachment) {
    switch (this.type) {
      case "email communication":
        return this.interventionService.deleteEmailCommunicationAttachment(this.task.interventionId, attachment);

      case "scheduled meeting":
        return this.interventionService.deleteScheduledMeetingAttachment(this.task.interventionId, attachment);

      case "success plan":
        return this.interventionService.deleteSuccessPlanAttachment(this.task.interventionId, attachment);

      case "truancy form":
        return this.interventionService.deleteTruancyFormAttachment(this.task.interventionId, attachment);
    }
  }
}
