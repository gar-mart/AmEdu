import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SignatureContent } from "@models/step-content.model";
import { StepsByStudent } from "@models/steps-by-student.model";
import { StudentSignatureContentModel } from "@models/student-signature-content.model";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SignatureFieldComponent } from "../../../design";
import { ContentComponentModel } from "../content-component.model";

@Component({
  selector: "app-signature-content",
  templateUrl: "./signature-content.component.html",
  styleUrls: ["./signature-content.component.scss"],
})
export class SignatureContentComponent extends ContentComponentModel implements OnInit, AfterViewInit, OnDestroy {
  @Input("content") contentType: SignatureContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() updateMode: boolean;
  @Input() step: StepsByStudent;
  @Output() edit = new EventEmitter<void>();

  @ViewChild(SignatureFieldComponent) signatureFieldComponent: SignatureFieldComponent;

  form: UntypedFormGroup;
  studentSignatureContent: StudentSignatureContentModel;

  get isValid() {
    return this.contentType.signer && this.contentType.disclaimer;
  }

  constructor(
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService,
    private fb: UntypedFormBuilder
  ) {
    super(orientationService, studentOrientationService);

    this.form = this.fb.group({
      signature: [null, Validators.required],
      signDate: [null, Validators.required],
      disclaimer: [null, [Validators.required, Validators.maxLength(500)]],
      signer: [null, [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    super.ngOnInit();

    (this.step
      ? this.orientationService.returnStudentSignatureContent(this.step.userId, this.contentType.id)
      : of(null)
    ).subscribe(studentSignatureContent => {
      this.studentSignatureContent = studentSignatureContent;

      if (this.studentSignatureContent?.signature) {
        this.form.get("signature").setValue(this.studentSignatureContent?.signature);
      }

      this.form.get("signDate").setValue(this.studentSignatureContent?.signDate ?? Date.now());
      this.form.get("signer").setValue(this.contentType.signer);
      this.form.get("disclaimer").setValue(this.contentType.disclaimer);

      this.subscriptions.push(
        this.form.get("disclaimer").valueChanges.subscribe(value => {
          this.contentType.disclaimer = value;
        }),
        this.form.get("signer").valueChanges.subscribe(value => {
          this.contentType.signer = value;
        })
      );
    });

    this.subscriptions.push(this.form.valueChanges.subscribe(() => this.edit.emit()));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit() {
    if (this.studentSignatureContent?.signature) {
      this.signatureFieldComponent?.signaturePad.fromDataURL(this.studentSignatureContent?.signature);
    }
  }

  clearSignature() {
    this.signatureFieldComponent.clear();
  }

  save(): Observable<string> {
    if (this.form.valid) {
      return this.orientationService
        .updateStudentSignatureContent({
          studentId: this.step.userId,
          signatureContentId: this.contentType.id,
          signDate: this.form.get("signDate").value,
          signature: this.form.get("signature").value,
        })
        .pipe(map(() => null));
    } else {
      return of("Please fill out the signature field(s).");
    }
  }
}
