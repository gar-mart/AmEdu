import { Injectable } from "@angular/core";
import { Content, StepContent, StepContentModel } from "@models/step-content.model";
import { Step } from "@models/step.model";
import { OrientationService } from "@services/orientation.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SlideService {
  private currentStep: Step;

  loadingContent = false;

  get content() {
    return this.currentStep?.content.content ?? [];
  }
  get nextOrderBy() {
    return this.content.length ? this.content[this.content.length - 1].orderBy + 1 : 1;
  }

  constructor(private orientationService: OrientationService) {}

  setContent(step: Step, forceReload = false): Observable<void> {
    return new Observable(observer => {
      const setContent = (stepContent: StepContent) => {
        step.content = stepContent ? new StepContentModel({ stepContent }) : stepContent;

        if (step === this.currentStep) {
          this.loadingContent = false;
        }

        observer.next();
        observer.complete();
      };

      if (step) {
        if (this.currentStep?.id === step?.id && !forceReload) {
          // don't re-build the content because the step hasn't changed.
          observer.next();
          observer.complete();
          return;
        }

        this.currentStep = step;

        if (!step.content || forceReload) {
          this.loadingContent = true;
          this.orientationService.returnStepContent(step.id).subscribe(stepContent => setContent(stepContent));
        } else {
          setContent(step.content);
        }
      } else {
        setContent(null);
      }
    });
  }

  contentTrackBy(index: number, item: Content) {
    return item.id;
  }
}
