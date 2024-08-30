import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";
import { AppEnvironment } from "app/enums/repository/app-environment.enum";
import { environment } from "environments/environment";
import { Subscription } from "rxjs";
import { Constants, Utility } from "../../shared";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("provider") providerInput: ElementRef<HTMLInputElement>;
  @ViewChild("externalSignIn") externalSignInForm: ElementRef<HTMLFormElement>;

  readonly showMicrosoftLogin = new Date() < new Date(2023, 6, 28); // starting July 28, 2023 only Google login should be available
  readonly showGoogleLogin =
    environment.configuration !== AppEnvironment.Production || // always show Google login in dev/test
    new Date() > new Date(2023, 5, 19); // starting June 19, 2023 Google login should be available

  subscription: Subscription;

  initializing = true;
  selectedLoginOption = 0;
  loginOptions = [
    { value: 1, text: "AmEdu Elementary Login", color: "primary" },
    { value: 2, text: "AmEdu Global Login", color: "accent" },
    { value: 3, text: "Staff Login", color: "warn" },
  ];

  constructor(@Inject(DOCUMENT) private document: HTMLDocument, private authService: AuthService) {
    try {
      const cachedValue = localStorage.getItem(Constants.loginTypeKey);
      if (cachedValue && this.loginOptions.some(option => option.value === Number(cachedValue))) {
        this.selectedLoginOption = Number(cachedValue);
      }
    } catch (e) {
      // local storage is unsupported
    }
    Utility.setFavicon(this.selectedLoginOption, this.document);
  }

  ngOnInit(): void {
    this.subscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.authService.redirectLoginUser();
      }
    });

    setTimeout(() => {
      if (this.authService.isLoggedIn) {
        this.authService.redirectLoginUser();
      } else {
        this.initializing = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectLogin(value) {
    this.selectedLoginOption = value;
    try {
      localStorage.setItem(Constants.loginTypeKey, value);
    } catch (e) {
      // local storage is unsupported
    }
    Utility.setFavicon(this.selectedLoginOption, this.document);
  }

  chooseNewLogin() {
    this.selectedLoginOption = 0;
    try {
      localStorage.removeItem(Constants.loginTypeKey);
    } catch (e) {
      // local storage is unsupported
    }
  }

  signIn(provider: "Google" | "Microsoft") {
    localStorage.setItem(Constants.loginProvider, provider);
    this.providerInput.nativeElement.value = provider;
    this.externalSignInForm.nativeElement.submit();
  }
}
