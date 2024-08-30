import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FDAngularRichTextWrapperComponent } from "@design/fdangular-rich-text-wrapper/fdangular-rich-text-wrapper.component";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { InterventionEmailTemplate } from "@models/intervention-email-template.model";
import { InterventionEmailTemplateFrom } from "app/enums/intervention-email-template-from.enum";
import { InterventionEmailTemplateTo } from "app/enums/intervention-email-template-to.enum";
import { InterventionLevel } from "app/enums/intervention-level.enum";
import { Utility } from "app/shared";
import { environment } from "environments/environment";
import { InterventionService } from "../../../interventions.service";

@Component({
  selector: "app-interventions-email-template",
  templateUrl: "./interventions-email-template.component.html",
  styleUrls: ["./interventions-email-template.component.scss"],
})
export class InterventionsEmailTemplateComponent implements OnInit {
  private initializeEditor = true;
  private editor: FDAngularRichTextWrapperComponent;

  @ViewChild(FDAngularRichTextWrapperComponent) set editorValue(value: FDAngularRichTextWrapperComponent) {
    this.editor = value;
    this.editorInit();
  }

  readonly fromMentor = InterventionEmailTemplateFrom.Mentor;
  readonly fromCounselor = InterventionEmailTemplateFrom.Counselor;
  readonly fromTruancy = InterventionEmailTemplateFrom.Truancy;

  form: UntypedFormGroup;
  interventionEmailTemplate: InterventionEmailTemplate;
  saving: boolean;
  loading = true;
  emailBody: string;
  interventionLevel: InterventionLevel;

  emailAttachments: File[] = [];

  angularEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "20vh",
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

  constructor(
    private interventionService: InterventionService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    route: ActivatedRoute
  ) {
    this.interventionLevel = +route.snapshot.paramMap.get("level");
  }

  ngOnInit(): void {
    this.interventionService.returnInterventionEmailTemplates().subscribe(result => {
      this.interventionEmailTemplate = result.find(t => t.interventionLevel === this.interventionLevel);

      if (!this.interventionEmailTemplate) {
        this.close();
      }

      this.emailAttachments = this.interventionEmailTemplate.attachmentList.map(a => {
        return new File([], a.filename);
      });
      this.emailBody = this.interventionEmailTemplate.emailBody;
      this.editorInit();

      this.form = this.formBuilder.group({
        interventionLevel: this.interventionEmailTemplate.interventionLevel,
        emailFrom: this.interventionEmailTemplate.emailFrom,
        sendToMentor: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Mentor),
        sendToSecondaryMentor: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.SecondaryMentor),
        sendToCounselor: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Counselor),
        sendToInterventionist: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Interventionist),
        sendToGuardian1: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Guardian1),
        sendToGuardian2: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Guardian2),
        sendToStudent: !!(this.interventionEmailTemplate.emailTo & InterventionEmailTemplateTo.Student),
        emailSubject: [this.interventionEmailTemplate.emailSubject, Validators.maxLength(200)],
        includeEngagementFlagSnapshot: [this.interventionEmailTemplate.includeEngagementFlagSnapshot],
      });
      this.loading = false;
    });
  }

  addAttachment(fileInputEvent) {
    const file: File = fileInputEvent.target.files[0];
    if (file) {
      Utility.setUniqueFileName(this.emailAttachments, file);
      this.emailAttachments.push(file);
    }
  }

  removeAttachment(index: number) {
    this.emailAttachments.splice(index, 1);
  }

  editorUpdated(html: string) {
    this.emailBody = Utility.cleanAngularEditorHtml(html);
  }

  save() {
    if (this.form.valid) {
      const formParam: InterventionEmailTemplate = this.form.value;
      formParam.emailBody = this.emailBody;

      formParam.emailTo =
        (this.form.value.sendToMentor ? InterventionEmailTemplateTo.Mentor : 0) +
        (this.form.value.sendToSecondaryMentor ? InterventionEmailTemplateTo.SecondaryMentor : 0) +
        (this.form.value.sendToCounselor ? InterventionEmailTemplateTo.Counselor : 0) +
        (this.form.value.sendToInterventionist ? InterventionEmailTemplateTo.Interventionist : 0) +
        (this.form.value.sendToGuardian1 ? InterventionEmailTemplateTo.Guardian1 : 0) +
        (this.form.value.sendToGuardian2 ? InterventionEmailTemplateTo.Guardian2 : 0) +
        (this.form.value.sendToStudent ? InterventionEmailTemplateTo.Student : 0);

      formParam.attachmentList = this.emailAttachments.map(a => {
        return {
          interventionLevel: this.interventionEmailTemplate.interventionLevel,
          filename: a.name,
        };
      });

      this.saving = true;
      this.interventionService
        .updateInterventionEmailTemplateAttachments(
          this.interventionEmailTemplate.interventionLevel,
          this.emailAttachments
        )
        .subscribe(
          attachmentUploadResults => {
            if (!attachmentUploadResults.some(x => !x)) {
              this.interventionService
                .updateInterventionEmailTemplate(formParam)
                .subscribe(templateSaved => {
                  if (templateSaved) {
                    this.close();
                  }
                })
                .add(() => (this.saving = false));
            } else {
              this.saving = false;
            }
          },
          () => (this.saving = false)
        );
    }
  }

  close() {
    this.router.navigateByUrl("/staff/interventions/email-templates");
  }

  preview(previewDialog: TemplateRef<any>) {
    this.dialog.open(previewDialog);
  }

  storageUrl(filename: string) {
    return `${environment.storageUrl}/intervention email templates/${this.interventionLevel}/${filename}`;
  }

  private editorInit() {
    if (this.initializeEditor && this.emailBody && this.editor?.angularEditor) {
      setTimeout(() => this.editor.angularEditor.writeValue(this.emailBody)); // need to use a setTimeout otherwise the editor overwrites this with a blank value
      this.initializeEditor = false;
    }
  }
}
