import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FDAngularRichTextWrapperComponent } from "@design/fdangular-rich-text-wrapper/fdangular-rich-text-wrapper.component";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Attachment } from "@models/attachment.model";
import { InterventionEmailTemplate } from "@models/intervention-email-template.model";
import { Intervention } from "@models/intervention.model";
import { Staff } from "@models/staff.model";
import { CommonService } from "@services/common.service";
import { DirectoryService } from "@services/directory.service";
import { InterventionEmailTemplateFrom } from "app/enums/intervention-email-template-from.enum";
import { Utility } from "app/shared";
import { InterventionService } from "app/staff/interventions/interventions.service";
import { environment } from "environments/environment";
import { forkJoin, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Component({
  selector: "app-email-communication-dialog",
  templateUrl: "./email-communication-dialog.component.html",
  styleUrls: ["./email-communication-dialog.component.scss"],
})
export class EmailCommunicationDialogComponent implements OnInit {
  private _angularEditorComponent: FDAngularRichTextWrapperComponent;
  @ViewChild(FDAngularRichTextWrapperComponent) set angularEditorComponent(value: FDAngularRichTextWrapperComponent) {
    this._angularEditorComponent = value;
    this.initializeAngularEditor();
  }

  emailSent: {
    fromEmailAddress: string;
    recipientEmails: string[];
    subject: string;
    body: string;
    attachments: Attachment[];
  };
  emailTemplate: InterventionEmailTemplate;
  counselors: Staff[];

  additionalRecipientControl = new UntypedFormControl(null, [Validators.email]);
  additionalRecipients: Set<string> = new Set<string>();
  emailAttachments: { file: File; url?: string }[] = [];
  angularEditorInitialized = false;
  angularEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "40vh",
    width: "100%",
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: "<br>",
    defaultFontName: "Verdana",
    sanitize: true,
    toolbarPosition: "top",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "verdana", name: "Verdana" },
    ],
    toolbarHiddenButtons: [
      [
        /*'bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'*/
      ],
      [/*'fontName', 'heading', 'fontSize', 'textColor',*/ "backgroundColor"],
      [
        /*'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'*/
      ],
      [
        /*'cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'*/
      ],
      [
        /*'paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'*/
      ],
      ["video" /*'link', 'unlink', 'image'*/],
    ],
  };

  get showCounselors() {
    return this.emailTemplate.emailFrom === InterventionEmailTemplateFrom.Counselor && this.counselors.length > 1;
  }

  private _disableInput = false;
  get disableInput(): boolean {
    return this._disableInput;
  }
  set disableInput(d: boolean) {
    this.angularEditorConfig.editable = !d;
    this._disableInput = d;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public intervention: Intervention,
    private dialogRef: MatDialogRef<EmailCommunicationDialogComponent>,
    private interventionService: InterventionService,
    private commonService: CommonService,
    private directoryService: DirectoryService,
    private snackBar: MatSnackBar
  ) {
    if (this.intervention.emailCommunication.email) {
      this.emailSent = JSON.parse(this.intervention.emailCommunication.email);
    }
  }

  ngOnInit(): void {
    if (this.emailSent) {
      return; // nothing to load
    }

    forkJoin({
      counselors: this.commonService.getCounselors(this.intervention.studentGradeLevel),
      emailTemplate: this.interventionService.returnInterventionEmailTemplateByInterventionId(this.intervention.id),
    }).subscribe(result => {
      this.emailTemplate = result.emailTemplate;
      this.counselors = result.counselors;

      this.emailAttachments = this.emailTemplate.attachmentList.map(x => {
        return {
          file: new File([], x.filename),
          url: `${environment.storageUrl}/intervention email templates/${this.emailTemplate.interventionLevel}/${x.filename}`,
        };
      });

      this.initializeAngularEditor();
    });
  }

  addAdditionalRecipient() {
    const additionalRecipient = this.additionalRecipientControl.value;

    if (this.additionalRecipientControl.valid && additionalRecipient) {
      this.additionalRecipients.add(additionalRecipient);
      this.additionalRecipientControl.setValue("");
    }
  }

  removeAdditionalRecipient(recipient: string) {
    this.additionalRecipients.delete(recipient);
    this.additionalRecipients = new Set(this.additionalRecipients);
  }

  addAttachment(fileInputEvent) {
    const file: File = fileInputEvent.target.files[0];
    if (file) {
      Utility.setUniqueFileName(
        this.emailAttachments.map(a => a.file),
        file
      );
      this.emailAttachments.push({ file });
    }
  }

  removeAttachment(index: number) {
    this.emailAttachments.splice(index, 1);
    this.emailAttachments = [...this.emailAttachments];
  }

  emailBodyChange(content: string) {
    this.emailTemplate.emailBody = Utility.cleanAngularEditorHtml(content);
  }

  send() {
    if (!this.emailTemplate.emailBody) {
      this.snackBar.open("Please enter a body for your email.", "Dismiss", { duration: 3000 });
      return;
    }

    if (!this.emailTemplate.emailSubject) {
      return; // no snackBar message necessary because the template displays a form field error
    }

    this.disableInput = true;
    this.directoryService
      .sendCommunicationEmail(
        {
          subject: this.emailTemplate.emailSubject,
          body: this.emailTemplate.emailBody,
          attachments: this.emailAttachments.map(a => a.file),
          fromEmailAddress: this.emailTemplate.emailFromAddress,
          additionalRecipients: this.emailTemplate.recipients.map(r => r.email).concat([...this.additionalRecipients]),
        },
        {
          interventionId: this.intervention.id,
        }
      )
      .pipe(
        tap(() => this.snackBar.open("Email sent!", "Close", { duration: 5000 })),
        catchError(err => {
          if (err.status === 400) {
            this.snackBar.open(err.error, "Close", { duration: 30000 });
            return of(null);
          }
          return throwError(err);
        })
      )
      .subscribe(result => {
        this.dialogRef.close(result);
      })
      .add(() => (this.disableInput = false));
  }

  private initializeAngularEditor() {
    if (!this.angularEditorInitialized && this.emailTemplate && this._angularEditorComponent) {
      this.angularEditorInitialized = true;
      if (this.emailTemplate.emailBody) {
        setTimeout(() => this._angularEditorComponent.angularEditor.writeValue(this.emailTemplate.emailBody));
      }
    }
  }
}
