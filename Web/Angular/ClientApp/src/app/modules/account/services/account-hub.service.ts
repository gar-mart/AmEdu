import { Injectable } from "@angular/core";
import { BaseHubService } from "@services/api/base-hub.service";
import { AuthService } from "@services/auth/auth.service";
import { EMPTY, from, Subject, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AccountHubService extends BaseHubService {
  private refresh$: Subject<void>;

  constructor(private authService: AuthService) {
    super("account/hub");
  }

  onRefresh() {
    if (!this.authService.isLoggedIn) {
      return throwError("Not signed in.");
    }

    if (this.refresh$) {
      return this.refresh$;
    }

    // ensure a connection
    return from(this.connect()).pipe(
      mergeMap(() => {
        this.refresh$ = new Subject<void>();

        this.connection.on("Refresh", () => {
          if (this.authService.isLoggedIn) {
            this.authService
              .refreshUser()
              .pipe(
                catchError(err => {
                  // this error would have been caught and handled elsewhere, so just log this error to the console and return null
                  console.warn(err);
                  return EMPTY;
                })
              )
              .subscribe(user => {
                if (user) {
                  this.refresh$.next();
                }
              });
          }
        });

        return this.refresh$.asObservable();
      })
    );
  }
}
