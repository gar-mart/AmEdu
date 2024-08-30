import { Component, NgZone, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { CommonService } from "@services/common.service";
import { NavigationService } from "@services/navigation.service";
import { OrientationService } from "@services/orientation.service";
import { Constants } from "../../shared";

@Component({
  selector: "app-auth-callback",
  templateUrl: "./auth-callback.component.html",
  styleUrls: ["./auth-callback.component.scss"],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _zone: NgZone,
    private authorizationService: AuthorizationService,
    private orientationService: OrientationService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.authService.refreshUser().subscribe(
      () => {
        const result = this.authService.currentUser;
        if (result && !this.commonService.isEmpty(result)) {
          if (result.id) {
            if (result.isStaff) {
              this.router.navigateByUrl(this.navigationService.redirectUrl || Constants.studentsPath);
            } else {
              this.orientationService.getStudentStepsAndProgress(result.userId).subscribe(data => {
                const completedSteps = data.studentProgress.completedSteps;
                const totalSteps = data.studentProgress.totalSteps;
                const hasCompletedAllSteps = completedSteps === totalSteps && totalSteps > 0;

                if (hasCompletedAllSteps) {
                  this.router.navigateByUrl(this.navigationService.redirectUrl || Constants.dashboardPath);
                } else {
                  this.router.navigateByUrl(Constants.orientationPath);
                }
              });
            }
            this.navigationService.redirectUrl = null;
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
      },
      err => {
        console.log(err);
        this.snackBar
          .open(`There was a problem signing you into the portal with the provided username.`, "Dismiss")
          .afterDismissed()
          .subscribe(() => this._zone.run(() => this.router.navigateByUrl("/not-authorized")));
      }
    );
  }
}
