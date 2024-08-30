import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, combineLatest, fromEvent } from "rxjs";
import { distinctUntilChanged, filter, startWith, takeWhile, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FdSnackBar } from "./fd-snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class OnlineStatusService implements OnDestroy {
  protected environment = environment;
  private readonly onlineChange = new Subject<boolean>();

  /**
   * Observable that will emit a status change event for the online status.
   * It will not emit repeating statuses in a row.
   * @returns true when the app switches from offline to online and false for vice versa.
   */
  $onlineChange = this.onlineChange.asObservable().pipe(distinctUntilChanged());

  /**
   * @returns true if the app has internet connection.
   */
  get isOnline() {
    return navigator.onLine;
  }

  /**
   * @returns true if the app has does not have internet connection.
   */
  get isOffline() {
    return !navigator.onLine;
  }

  constructor(private snackBar: FdSnackBar) {}

  ngOnDestroy(): void {
    this.onlineChange.complete();
  }

  initialize() {
    if (this.environment.onlineStatusNotifications.enabled) this.initializeStatusReports();

    const $online = fromEvent(window, "online").pipe(startWith(true));
    let $offline: Observable<any> = fromEvent(window, "offline");

    if (!navigator.onLine) {
      // only start this observable off with false if not currently online to trigger a "status change" event
      $offline = $offline.pipe(startWith(false));
    }

    combineLatest([$online, $offline])
      .pipe(
        // takeWhile will unsubscribe this when the onlineChange Subject is complete
        takeWhile(() => !this.onlineChange.isStopped),
        tap(() => this.onlineChange.next(navigator.onLine))
      )
      .subscribe();
  }

  private initializeStatusReports() {
    const { connectionRestored, connectionLost } = this.environment.onlineStatusNotifications;

    const $cameBackOnline = this.$onlineChange.pipe(
      filter(online => online),
      tap(() => this.snackBar.openPrimary(connectionRestored))
    );

    const $wentOffline = this.$onlineChange.pipe(
      filter(online => !online),
      tap(() => this.snackBar.openWarn(connectionLost))
    );

    // these subscriptions do not need to be explicitly unsubscribed from since the source is completed in ngOnDestroy
    $cameBackOnline.subscribe();
    $wentOffline.subscribe();
  }
}
