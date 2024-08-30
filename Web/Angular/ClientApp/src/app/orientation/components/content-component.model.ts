import { Injectable, OnDestroy, OnInit, inject } from "@angular/core";
import { StepsByStudent } from "@models/steps-by-student.model";
import { AuthService } from "@services/auth/auth.service";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { UserDtoInterface } from "app/modules/account/models/user-dto.model";
import { Observable, Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export abstract class ContentComponentModel implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  protected authService = inject(AuthService);

  /** The logged in user */
  get user(): UserDtoInterface {
    return this.authService.currentUser;
  }

  /** Should be marked as an @Input() */
  abstract step: StepsByStudent;
  /** Should be marked as an @Input() */
  abstract editMode: boolean;
  /** Should be marked as an @Input() */
  abstract previewMode: boolean;

  constructor(
    protected orientationService: OrientationService,
    private studentOrientationService: StudentOrientationService
  ) {}

  ngOnInit(): void {
    if (this.editMode) {
      return;
    }

    this.subscriptions.push(
      this.studentOrientationService.listenToSave().subscribe(() => {
        this.subscriptions.push(
          this.save().subscribe(error => {
            this.studentOrientationService.afterComponentSaved(error);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  abstract save(): Observable<string>;
}
