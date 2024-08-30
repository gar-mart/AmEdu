import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Observable, Subject, Subscriber } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { DBkeys } from "app/helpers/constants/db-keys.constants";
import { Utilities } from "app/helpers/utilities/utilities";
import { UserDtoInterface, UserDtoModel } from "../../modules/account/models/user-dto.model";
import { AccountApiService } from "../../modules/account/services/account-api.service";
import { LocalStoreManager } from "../local-store-manager.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private previousIsLoggedInCheck = false;
  private loginStatus = new Subject<boolean>();

  loginRedirectUrl: string;
  logoutRedirectUrl: string;

  reLoginDelegate: () => void;

  private readonly refreshing: Subscriber<UserDtoInterface>[] = [];

  get currentUser(): UserDtoInterface {
    const user = this.localStorage.getDataObject<UserDtoInterface>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);
    return user ? Object.assign(new UserDtoModel(), user) : null;
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get rememberMe(): boolean {
    return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) === true;
  }

  set rememberMe(value: boolean) {
    this.localStorage.savePermanentData(value, DBkeys.REMEMBER_ME);
  }

  constructor(
    private router: Router,
    private localStorage: LocalStoreManager,
    private accountApiService: AccountApiService
  ) {
    this.initializeLoginStatus();
  }

  getReturnUrl(): {
    firstPart: string;
    extras: NavigationExtras;
    wholePart: string;
  } {
    const redirect =
      this.loginRedirectUrl && this.loginRedirectUrl !== "/" && this.loginRedirectUrl !== "/"
        ? this.loginRedirectUrl
        : "/";
    this.loginRedirectUrl = null;

    const urlParamsAndFragment = Utilities.splitInTwo(redirect, "#");
    const urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, "?");

    const navigationExtras: NavigationExtras = {
      fragment: urlParamsAndFragment.secondPart,
      queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
      queryParamsHandling: "merge",
    };

    return {
      firstPart: urlParamsAndFragment.firstPart,
      extras: navigationExtras,
      wholePart: redirect,
    };
  }

  redirectLoginUser() {
    const returnUrl: string = this.localStorage.getData(LocalStoreManager.DBKEY_RETURN_URL);
    if (returnUrl) {
      this.localStorage.deleteData(LocalStoreManager.DBKEY_RETURN_URL);
      this.router.navigateByUrl(returnUrl);
    } else {
      const { firstPart, extras } = this.getReturnUrl();
      this.router.navigate([firstPart], extras);
    }
  }

  redirectLogoutUser() {
    const redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : "/login";
    this.logoutRedirectUrl = null;

    this.router.navigate([redirect]);
  }

  redirectForLogin() {
    this.loginRedirectUrl = this.router.url;
    this.router.navigateByUrl("/login");
  }

  reLogin() {
    if (this.reLoginDelegate) {
      this.reLoginDelegate();
    } else {
      this.redirectForLogin();
    }
  }

  signIn(userName: string, password: string, rememberMe?: boolean, backdoor?: boolean): Observable<UserDtoInterface> {
    let signIn = this.accountApiService
      .signIn(userName, password, rememberMe, backdoor)
      .pipe(map((response: UserDtoInterface) => this.processLoginResponse(response, rememberMe)));

    if (this.isLoggedIn) {
      signIn = this.signOut().pipe(switchMap(() => signIn));
    }

    return signIn;
  }

  confirmEmail(emailAddress: string, code: string): Observable<UserDtoInterface> {
    return this.accountApiService
      .confirmEmail(emailAddress, code)
      .pipe(map((response: UserDtoInterface) => this.processLoginResponse(response)));
  }

  refreshUser(): Observable<UserDtoInterface> {
    const service = this;

    return new Observable(subscriber => {
      service.refreshing.push(subscriber);

      if (service.refreshing.length <= 1) {
        const subscription = service.accountApiService
          .me()
          .pipe(
            map((response: UserDtoInterface) => {
              if (response) {
                service.processLoginResponse(response);
              }
              return response;
            })
          )
          .subscribe({
            next(value) {
              while (service.refreshing.length) {
                const sub = service.refreshing.pop();
                sub.next(value);
                sub.complete();
              }
            },
            error(err) {
              while (service.refreshing.length) {
                const sub = service.refreshing.pop();
                sub.error(err);
              }
            },
            complete() {
              while (service.refreshing.length) {
                service.refreshing.pop().complete();
              }
            },
          });

        return () => {
          subscription.unsubscribe();
        };
      }

      return () => {};
    });
  }

  impersonateUser(id: string) {
    return this.accountApiService.impersonate(id).pipe(
      map((response: UserDtoInterface) => {
        if (response) {
          this.processLoginResponse(response);
        }
        return response;
      })
    );
  }

  abortImpersonate() {
    return this.accountApiService.abortImpersonate().pipe(
      map((response: UserDtoInterface) => {
        if (response) {
          this.processLoginResponse(response);
        }
        return response;
      })
    );
  }

  signOut(): Observable<any> {
    while (this.refreshing.length) {
      const sub = this.refreshing.pop();
      sub.complete();
    }

    this.clearUser();
    return this.accountApiService.signOut();
  }

  getLoginStatusEvent(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  private processLoginResponse(user: UserDtoInterface, rememberMe?: boolean) {
    rememberMe ??= this.rememberMe;

    this.saveUserDetails(user, rememberMe);
    this.reevaluateLoginStatus(user);

    return user;
  }

  private saveUserDetails(user: UserDtoInterface, rememberMe: boolean) {
    this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
    this.localStorage.saveData(user, DBkeys.CURRENT_USER);
  }

  private clearUser() {
    this.localStorage.deleteData(DBkeys.USER_PERMISSIONS);
    this.localStorage.deleteData(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus();
  }

  private reevaluateLoginStatus(currentUser?: UserDtoInterface) {
    const user = currentUser || this.localStorage.getDataObject<UserDtoInterface>(DBkeys.CURRENT_USER);
    const isLoggedIn = user != null;

    if (this.previousIsLoggedInCheck !== isLoggedIn) {
      setTimeout(() => {
        this.loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }

  private initializeLoginStatus() {
    this.localStorage.getInitEvent().subscribe(() => {
      this.reevaluateLoginStatus();
    });
  }
}
