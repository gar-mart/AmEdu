import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { AppComponent } from "app/app.component";
import { SendUsASelfieStep, StepsByStudent } from "app/models";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ContentComponentModel } from "../../content-component.model";

@Component({
  selector: "app-send-us-a-selfie",
  templateUrl: "./send-us-a-selfie.component.html",
  styleUrls: ["./send-us-a-selfie.component.scss"],
})
export class SendUsASelfieComponent extends ContentComponentModel implements OnInit, OnDestroy, AfterViewInit {
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() updateMode: boolean;
  @Input() step: StepsByStudent;

  @ViewChild("video") public video: ElementRef;
  @ViewChild("canvas") public canvas: ElementRef;

  IMAGE_SIZE = 400;

  lastCapturedPicture: string;
  capturedPicture: string;

  get sanitizedCapturedPicture() {
    return `url(${this.capturedPicture})`;
  }
  showVideo = false;
  showCanvas = false;
  studentImageUrl: string;
  cameraAccessAllowed = false;

  get canvasElement(): HTMLCanvasElement {
    return this.canvas?.nativeElement;
  }
  get videoElement(): HTMLVideoElement {
    return this.video?.nativeElement;
  }
  get videoStream(): MediaStream {
    return this.videoElement?.srcObject as MediaStream;
  }
  set videoStream(stream: MediaStream) {
    this.videoElement.srcObject = stream;
  }

  get showTakePicture() {
    return this.showVideo;
  }

  get showRetakePicture(): boolean {
    return !this.showVideo;
  }

  get isEnabled() {
    return !this.step?.isCompleted || this.step?.editMode || this.updateMode;
  }

  constructor(
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService,
    public appComponent: AppComponent,
    private snackBar: MatSnackBar
  ) {
    super(orientationService, studentOrientationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    if (this.editMode) {
      return;
    }

    if (this.previewMode) {
      this.enableVideo();
    } else if (this.step) {
      this.setupStudentMode();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.editMode) {
      return;
    }

    this.videoStream?.getTracks().forEach(track => track.stop());
  }

  capture() {
    this.lastCapturedPicture = this.capturedPicture;

    this.canvasElement.width = this.videoElement.offsetWidth;
    this.canvasElement.height = this.videoElement.offsetHeight;
    const context = this.canvasElement.getContext("2d");
    context.drawImage(
      this.videoElement, // image source
      0,
      0
    );

    this.capturedPicture = this.canvasElement.toDataURL("image/jpeg", 0.5);
    this.videoStream?.getTracks().forEach(track => track.stop());
    this.showVideo = false;
  }

  retakePicture() {
    this.enableVideo();
  }

  save(): Observable<string> {
    if (this.showVideo && this.studentImageUrl) {
      return of("Please take a new picture or click cancel first.");
    }

    if (!this.capturedPicture) {
      if (this.studentImageUrl) {
        return of(null);
      }

      return of("Please upload a selfie first.");
    }

    const selfieData: SendUsASelfieStep = {
      userId: this.step.userId,
      picture: this.capturedPicture,
    };

    return this.orientationService.submitSendUsASelfieStep(selfieData).pipe(map(() => null));
  }

  cancel() {
    this.showVideo = false;
    this.capturedPicture = null;

    if (this.lastCapturedPicture && !this.studentImageUrl) {
      this.capturedPicture = this.lastCapturedPicture;
      this.lastCapturedPicture = null;
    }
  }

  private setupStudentMode() {
    setTimeout(() => (this.appComponent.isBusy = true));

    this.orientationService
      .getStepSendUsASelfieData(this.step.userId)
      .subscribe((data: SendUsASelfieStep) => {
        this.studentImageUrl = data?.picture;
        if (!this.studentImageUrl) {
          this.enableVideo();
        }
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  private enableVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.cameraAccessAllowed = false;
      setTimeout(() => (this.showVideo = true));
      navigator.mediaDevices
        .getUserMedia({ video: { width: this.IMAGE_SIZE, height: this.IMAGE_SIZE } })
        .then(stream => {
          this.videoStream = stream;
          this.videoElement.play();
          this.cameraAccessAllowed = true;
        });
    }
  }
}
