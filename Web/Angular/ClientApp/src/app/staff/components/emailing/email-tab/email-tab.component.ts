import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FDAngularRichTextWrapperComponent } from "@design/fdangular-rich-text-wrapper/fdangular-rich-text-wrapper.component";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { AuthService } from "@services/auth/auth.service";
import { Subscription } from "rxjs";
import { filter, finalize, switchMap, tap } from "rxjs/operators";
import { AppComponent } from "../../../../app.component";
import { CommunicationListEntry } from "../../../../models";
import { EmailTemplate } from "../../../../models/email-template.model";
import { Utility } from "../../../../shared";
import { StaffService } from "../../../services";
import { PreviewEmailDialogComponent } from "../preview-email-dialog/preview-email-dialog.component";
import { PreviewEmailModel } from "../preview-email-dialog/preview-email.model";
import {
  SaveEmailTemplateDialogComponent,
  SaveEmailTemplateDialogResult,
} from "../save-email-template-dialog/save-email-template-dialog.component";

@Component({
  selector: "app-communication-email-tab",
  templateUrl: "./email-tab.component.html",
  styleUrls: ["./email-tab.component.scss"],
})
export class EmailTabComponent implements OnInit, OnDestroy {
  @Input() includedEntries: CommunicationListEntry[];
  @Input() emailTemplates: EmailTemplate[];
  @Input() recipients: string[];

  @ViewChild(FDAngularRichTextWrapperComponent, { static: true }) fdEditor: FDAngularRichTextWrapperComponent;

  private readonly subscriptions: Subscription[] = [];
  readonly personalizationTokens = [
    { key: "{student_first_name}", label: "Student First Name" },
    { key: "{student_last_name}", label: "Student Last Name" },
    { key: "{guardian_first_name}", label: "Guardian First Name" },
    { key: "{guardian_last_name}", label: "Guardian Last Name" },
    { key: "{mentor_first_name}", label: "Mentor First Name" },
    { key: "{mentor_last_name}", label: "Mentor Last Name" },
  ] as const;

  tokenFormControl = new UntypedFormControl();
  emailTemplate: EmailTemplate;
  sendAsEmailAddress = this.staffService.user.email;
  bccAllRecipients = true;

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

  emailInlineImages: File[] = [];
  emailSubject: string;
  emailBody: string;

  emailAttachments: File[] = [];

  get allowPersonalization(): boolean {
    return (
      this.bccAllRecipients &&
      this.includedEntries.some(x => x.includeGuardian1 || x.includeGuardian2 || x.includeStudent)
    );
  }

  get structuredRecipients(): string {
    return this.recipients.join("; ");
  }

  constructor(
    private appComponent: AppComponent,
    private staffService: StaffService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.sendAsEmailAddress = this.authService.currentUser.email;
  }

  ngOnInit() {
    this.emailTemplate = this.emailTemplates[0];
    this.subscriptions.push(
      this.tokenFormControl.valueChanges.subscribe((token: string) => {
        if (token) {
          this.tokenFormControl.patchValue(null, { emitEvent: false });

          const textArea = this.fdEditor.angularEditor.editorWrapper.nativeElement.firstChild;

          // oddly, we cannot set focus onto the textArea unless we do so in a setTimeout
          // https://stackoverflow.com/a/37162116/7328169
          setTimeout(() => {
            // function to recursively find the last "editable" node
            // we cannot simply append text to the editor since it is built out of a dynamic set of HTML nodes
            const getlastEditableNode = el => {
              return el.lastChild &&
                el.lastChild.nodeName !== "#text" &&
                ["div", "span", "font", "b", "i", "em", "strong", "li"].includes(el.lastChild.localName)
                ? getlastEditableNode(el.lastChild)
                : el;
            };

            textArea.focus();
            const lastEditableNode = getlastEditableNode(textArea);

            // put the caret at the end of the last editable node so that we are "appending" the token using the same style as the last piece of formatted text
            this.placeCaretAtEnd(lastEditableNode);
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            range.insertNode(document.createTextNode(token));

            // again, move the caret to the end so that the user may continue typing
            this.placeCaretAtEnd(lastEditableNode);

            // trigger the updated function as it doesn't happen automatically using this functionality
            this.editorUpdated(textArea.innerHTML);
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  editorUpdated(html: string) {
    this.emailBody = Utility.cleanAngularEditorHtml(html);
  }

  inlineImageAdded(file: File) {}

  focusRecipients(e: FocusEvent) {
    const target = e.currentTarget as HTMLInputElement;
    target.select();
  }

  previewEmail() {
    const previewEmailModel: PreviewEmailModel = {
      fromEmailAddress: this.sendAsEmailAddress,
      subject: this.emailSubject,
      body: this.emailBody,
      attachments: this.emailAttachments,
      optionalRecipients: this.includedEntries.filter(x => !x.additionalRecipientEmailAddress),
      additionalRecipients: this.includedEntries
        .filter(x => !!x.additionalRecipientEmailAddress)
        .map(x => x.additionalRecipientEmailAddress),
      bccAllRecipients: this.bccAllRecipients,
      allowPersonalization: this.allowPersonalization,
    };
    this.dialog
      .open(PreviewEmailDialogComponent, {
        data: { previewEmailModel, personalizationTokens: this.personalizationTokens.map(x => x.key) },
        autoFocus: false,
        width: "80vw",
        panelClass: ["rounded-dialog-window"],
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          window.location.reload();
        }
      });
  }

  addAttachment(fileInputEvent) {
    const file: File = fileInputEvent.target.files[0];
    if (file) {
      this.emailAttachments.push(file);
    }
  }

  removeAttachment(index: number) {
    this.emailAttachments.splice(index, 1);
  }

  templateSelected() {
    this.fdEditor.angularEditor.writeValue(this.emailTemplate.html);
    this.emailBody = this.emailTemplate.html;
  }

  manageEmailTemplate() {
    const emailTemplate = Object.assign({}, this.emailTemplate);
    emailTemplate.html = this.emailBody || "";

    if (!emailTemplate.id) {
      emailTemplate.name = "";
    }

    this.dialog
      .open(SaveEmailTemplateDialogComponent, {
        data: emailTemplate,
        autoFocus: false,
        width: "80vw",
        panelClass: ["rounded-dialog-window"],
      })
      .beforeClosed()
      .pipe(
        filter((result: SaveEmailTemplateDialogResult) => result.save || result.delete),
        tap(() => (this.appComponent.isBusy = true)),
        switchMap((result: SaveEmailTemplateDialogResult) =>
          result.save
            ? this.staffService.saveEmailTemplate(emailTemplate).pipe(
                tap(result => {
                  if (this.emailTemplate.id) {
                    // update
                    this.emailTemplate.html = emailTemplate.html;
                    this.emailTemplate.name = emailTemplate.name;
                  } else {
                    // insert
                    emailTemplate.id = result;
                    this.emailTemplate = emailTemplate;
                    this.emailTemplates.push(emailTemplate);
                  }
                })
              )
            : this.staffService.deleteEmailTemplate(emailTemplate.id).pipe(
                tap(result => {
                  if (result) {
                    // delete
                    this.emailTemplates = this.emailTemplates.filter(x => x.id !== emailTemplate.id);
                    this.emailTemplate = this.emailTemplates[0];
                  }
                })
              )
        ),
        finalize(() => (this.appComponent.isBusy = false))
      )
      .subscribe();
  }

  emailAddressIsValid(email: string) {
    return Utility.emailAddressIsValid(email);
  }

  private placeCaretAtEnd(el) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof (document.body as any).createTextRange != "undefined") {
      const textRange = (document.body as any).createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }
}
