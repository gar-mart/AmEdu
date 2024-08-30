import { Component, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { LocalStoreManager } from "@services/local-store-manager.service";
import { Subscription, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountHubService } from "./modules/account/services/account-hub.service";
import { Constants, Utility } from "./shared";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "AmEduEnrollmentWeb";
  isBusy = false;
  refreshAccountSubscription: Subscription;

  constructor(
    storageManager: LocalStoreManager,
    private router: Router,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private authService: AuthService,
    private accountHubService: AccountHubService
  ) {
    storageManager.initialiseStorageSyncListener();

    if (this.authService.isLoggedIn) {
      this.authService
        .refreshUser()
        .pipe(
          catchError(err => {
            if (err.status === 401) {
              this.signOut();
            }

            return of(false);
          })
        )
        .subscribe();
    }

    this.finalizeInit();

    const loginOption = localStorage.getItem(Constants.loginTypeKey);
    Utility.setFavicon(loginOption, this.document);

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isBusy = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isBusy = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  signOut(): void {
    this.authService.signOut().subscribe();
    this.authService.redirectLogoutUser();
  }

  private finalizeInit() {
    this.authService.reLoginDelegate = () => {};

    this.authService.getLoginStatusEvent().subscribe(() => {
      if (this.authService.isLoggedIn) {
        if (!this.refreshAccountSubscription) {
          this.refreshAccountSubscription = this.accountHubService.onRefresh().subscribe();
        }
      } else {
        this.refreshAccountSubscription?.unsubscribe();
        this.refreshAccountSubscription = null;
      }
    });
  }
}
