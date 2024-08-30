import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";
import { CommonService } from "@services/common.service";
import { Subject } from "rxjs";
import { AppComponent } from "../../../app.component";
import { Constants } from "../../../shared";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  message = "";
  private _componentDestroyed$: Subject<boolean> = new Subject();

  isSignedIn = false;
  loginType = 2; // AmEdu global is default

  constructor(
    private appComponent: AppComponent,
    private authService: AuthService,
    public commonService: CommonService
  ) {
    this.isSignedIn = this.authService.isLoggedIn;
    try {
      const cachedValue = localStorage.getItem(Constants.loginTypeKey);
      if (cachedValue) {
        this.loginType = Number(cachedValue);
      }
    } catch (e) {
      // local storage is unsupported
    }
  }

  ngOnInit() {
    this.commonService.getEnvironment().subscribe(result => {
      this.message = result.toUpperCase();
    });
  }

  logout() {
    this.authService.signOut().subscribe();
    this.authService.redirectLogoutUser();
  }

  ngOnDestroy() {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  changeGradeLevel(value) {
    this.appComponent.isBusy = true;
    this.commonService
      .setStudentGradeLevel(this.authService.currentUser.userId, value)
      .subscribe(() => location.reload());
  }
}
