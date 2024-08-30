import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GlobalLoadingIndicatorService {
  private eventCount = 0;
  private suppressNextEventCount = 0;

  private isLoading = new Subject<boolean>();

  /** Triggered when the global loading indicator should start (when at least one event has started) and when it should end (when all events have ended) */
  isLoading$ = this.isLoading.asObservable();

  /**
   * Adds a loading event to the service. Call end() only if this returns a value of true.
   * Triggers isLoading with value true if this is the only event running.
   */
  startEvent() {
    if (this.suppressNextEventCount > 0) {
      // caller asked to bypass the next loading event. Decrement the value and return.
      this.suppressNextEventCount--;
      return false;
    }

    if (this.eventCount++ === 0) {
      this.isLoading.next(true);
    }

    return true;
  }

  /**
   * Removes a loading event from the service.
   * Triggers isLoading with value false if the last event running.
   * Optional flag to provide the result of startEvent() in uncontrolled situations, such as the API interceptor.
   */
  endEvent(eventRunning: boolean = true) {
    if (eventRunning) {
      this.eventCount = Math.max(0, this.eventCount - 1);

      if (this.eventCount === 0) {
        this.isLoading.next(false);
      }
    }
  }

  /** Simple way to virtually "ignore" the next startEvent(), so that it takes at least one more to trigger the global loading indicator. */
  suppressNextEvent() {
    this.suppressNextEventCount++;
  }
}
