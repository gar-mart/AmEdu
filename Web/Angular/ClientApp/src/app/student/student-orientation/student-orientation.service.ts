import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class StudentOrientationService {
  private componentsListening: Subject<void>[] = [];
  private onComponentSaved = new Subject<string>();
  private onComponentSaved$ = this.onComponentSaved.asObservable();

  /** Emits an error if any component failed to save */
  saveComponents(): Observable<string> {
    if (!this.componentsListening.length) {
      return of(null);
    }

    let successfulSaves = 0;

    const saving$ = new Observable<string>(subscriber => {
      const subscription = this.onComponentSaved$.subscribe(error => {
        if (error) {
          subscriber.next(error);
          subscriber.complete();
          subscription.unsubscribe();
        } else if (++successfulSaves === this.componentsListening.length) {
          // remove component listeners as the save was entirely successful
          this.componentsListening.forEach(c => c.unsubscribe());
          this.componentsListening = [];

          subscriber.next(null);
          subscriber.complete();
          subscription.unsubscribe();
        } else {
          // trigger the next component to save
          this.componentsListening[successfulSaves].next();
        }
      });
      // trigger the first component to save
      this.componentsListening[successfulSaves].next();
    });

    return saving$;
  }

  listenToSave(): Observable<void> {
    const listener = new Subject<void>();
    this.componentsListening.push(listener);
    return listener.asObservable();
  }

  /** After a component has been saved, then emit an event to let the main slide know */
  afterComponentSaved(error?: string) {
    this.onComponentSaved.next(error);
  }

  reset() {
    this.componentsListening.forEach(c => c.unsubscribe());
    this.componentsListening = [];
  }
}
