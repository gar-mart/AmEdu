import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { IEnvironment } from "../../environments/environment.definition";
import { AppEnvironment } from "../enums/repository/app-environment.enum";
import { AuthService } from "./auth/auth.service";
import { FdSnackBar } from "./fd-snack-bar.service";

@Injectable({ providedIn: "root" })
export class AppErrorHandler extends ErrorHandler {
  private handlingError: boolean = false;

  constructor(
    private snackBar: FdSnackBar,
    private environment: IEnvironment,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {
    super();
  }

  handleError(error: any) {
    if (!this.handlingError) {
      let message = "Sorry, there was an unhandled error.";
      let showRefresh = false;
      let showLogin = false;

      switch (error?.status) {
        case 0:
          showRefresh = true;
          message = "Sorry, the server couldn't be reached. Please check your internet connection.";
          break;
        case 400:
          message = error?.error ?? "Sorry, we couldn't process your request.";
          break;
        case 401:
          showLogin = true;
          message = "Sorry, you are not signed in.";
          break;
        case 403:
          showRefresh = true;
          message = "Sorry, you are not allowed to access this resource.";
          break;
        case 413:
          message = "Sorry, your request was too large for us to handle.";
        case 500:
          showRefresh = true;
          message =
            (this.environment.configuration !== AppEnvironment.Production
              ? error?.error?.title ?? error?.error
              : null) || "Sorry, the server had an unexpected error.";
          break;
      }

      this.zone.run(() => {
        // we must ensure that the snackbar runs in the angular zone otherwise it may not render correctly
        if (this.environment.configuration === AppEnvironment.Production || error?.status !== 500) {
          if (showRefresh) {
            this.snackBar
              .openWarn(message, showRefresh ? "Refresh" : null)
              .onAction()
              .subscribe(() => window.location.reload());
          } else if (showLogin) {
            this.snackBar
              .openWarn(message, "Login")
              .onAction()
              .subscribe(() => this.authService.signOut().subscribe(() => this.router.navigateByUrl("/login")));
          } else {
            this.snackBar.openWarn(message);
          }
        } else {
          this.snackBar
            .openWarn(message, "View Error", { duration: 5000 })
            .onAction()
            .subscribe(() => window.alert(error?.error?.detail || error?.error));
        }
      });
    }

    super.handleError(error);
  }
}
