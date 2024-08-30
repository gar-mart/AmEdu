import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ApplicationInsightsService } from "@services/application-insights.service";
import { AuthService } from "@services/auth/auth.service";
import { CommonService } from "@services/common.service";
import { environment } from "environments/environment";
import { AppEnvironment } from "./enums/repository/app-environment.enum";
import { ErrorService } from "./services/error.service";

@Injectable({ providedIn: "root" })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private authService: AuthService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private _zone: NgZone,
    private appInsightsService: ApplicationInsightsService
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const username = this.authService.currentUser?.email ?? "anonymous";

    let message;
    let stackTrace;

    if (environment.configuration !== AppEnvironment.Development) {
      this.appInsightsService.appInsights.trackException(
        {
          exception: new Error(JSON.stringify(error)),
        },
        {
          username,
          serverError: error instanceof HttpErrorResponse,
        }
      );
    }

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerErrorMessage(error);
      stackTrace = errorService.getServerStack(error);
      throw error;
    } else {
      // Client Error
      message =
        "User " + username + " has encountered the following error: " + errorService.getClientErrorMessage(error);
      stackTrace = errorService.getClientStack(error);

      const mes = errorService.getClientErrorMessage(error);
      if (
        mes === "Uncaught (in promise): NotAllowedError: Permission denied" ||
        mes === "Uncaught (in promise): NotAllowedError: Permission dismissed"
      ) {
        this._zone.run(() => {
          const config = new MatSnackBarConfig();
          config.verticalPosition = "bottom";
          config.horizontalPosition = "center";
          config.duration = 4000;
          config.panelClass = "error";
          const snackBar = this.snackBar.open(
            "You must allow access to the camera in order to take the selfie",
            "Close",
            config
          );
          const onActionSubscription = snackBar.onAction().subscribe(() => {
            snackBar.dismiss();
          });
          snackBar.afterDismissed().subscribe(() => onActionSubscription.unsubscribe());
        });
      }

      const newError = {
        message: message,
        stackTrace: stackTrace,
      };
      const em = errorService.getClientErrorMessage(error);

      if (environment.configuration !== AppEnvironment.Production) {
        console.error(error);
      } else {
        // Code block is here to account for instances where after a new version of the application has been deployed, a user tries to navigate to a specific area
        // while working off a cached version. When this happens, the user receives a "Loading Chunk [insert number here] failed" error.
        // This will not send the error message to the Notify Developers method server side
        const chunkFailedErrorMessage = /Loading chunk [\d]+ failed/;

        if (
          em !== "Uncaught (in promise): User login is required" &&
          em !== "Cannot send request to registered endpoint if the user is not authenticated." &&
          !em.includes("Uncaught (in promise): NotAllowedError: Permission denied") &&
          !em.includes("Uncaught (in promise): NotAllowedError: Permission dismissed") &&
          !em.includes("ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked") &&
          !em.includes("The data area passed to a system call is too small") &&
          !em.includes("TypeError: null is not an object (evaluating 'localStorage.getItem')") &&
          !em.match(chunkFailedErrorMessage)
        ) {
          this.commonService.sendErrorEmail(newError).subscribe();
        } else if (chunkFailedErrorMessage.test(em.toString())) {
          // Force a full refresh of the page to ensure the user is working off the latest set of code, instead of a cached version
          window.location.reload();
        }
      }
    }
  }
}
