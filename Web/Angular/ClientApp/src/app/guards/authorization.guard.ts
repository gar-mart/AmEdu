import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { CommonService } from "@services/common.service";
import { OrientationService } from "../services/orientation.service";
import { Constants } from "../shared";

@Injectable({ providedIn: "root" })
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private _zone: NgZone,
    private orientationService: OrientationService,
    private commonService: CommonService,
    private snackBar: MatSnackBar
  ) {}

  canActivate() {
    if (this.authService.isLoggedIn) {
      this.authorizationService.getUserByUserName(this.authService.currentUser.email).subscribe(result => {
        if (result && !this.commonService.isEmpty(result)) {
          if (result.id) {
            if (result.isStaff) {
              setTimeout(() => {
                this._zone.run(() => this.router.navigateByUrl(Constants.studentsPath));
              });
            } else {
              this.orientationService.getStudentStepsAndProgress(parseInt(result.id.toString())).subscribe(data => {
                const hasCompletedAllSteps =
                  data !== null &&
                  data.studentProgress.completedSteps === data.studentProgress.totalSteps &&
                  data.studentProgress.totalSteps > 0;

                setTimeout(() => {
                  this._zone.run(() =>
                    this.router.navigateByUrl(
                      hasCompletedAllSteps ? Constants.dashboardPath : Constants.orientationPath
                    )
                  );
                });
              });
            }
          } else {
            this.snackBar.open(
              "No user account with the provided username and password was found. Please reach out to support@AmEduglobal.org or contact your mentor if you need access or think this is a mistake.",
              "Dismiss",
              {
                duration: 6000,
              }
            );
            setTimeout(() => {
              this._zone.run(() => this.router.navigateByUrl("/not-authorized"));
            }, 200);
          }
        }
      });
      return true;
    } else {
      return false;
    }
  }
}
