import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ControllerBase } from "../../../services/api/controller-base";
import { ApplicationIdentityUser } from "../models/application-identity-user.model";
import { ProfileDtoInterface } from "../models/profile-dto.model";
import { UserDtoInterface } from "../models/user-dto.model";

@Injectable({ providedIn: "root" })
export class AccountApiService extends ControllerBase<UserDtoInterface> {
  constructor(http: HttpClient) {
    super(http, "Account/Account");
  }

  /** Signs user into server. If successful, the user is returned from the server. */
  signIn(userName: string, password: string, rememberMe?: boolean, backdoor?: boolean) {
    return this._post<UserDtoInterface>(
      {
        userName,
        password,
        rememberMe,
        backdoor,
      },
      { url: "SignIn" }
    );
  }

  /** Signs user out of server. */
  signOut() {
    return this._post(null, { url: "SignOut" });
  }

  /** Returns currently signed in user. */
  me<T extends UserDtoInterface | ApplicationIdentityUser | ProfileDtoInterface = UserDtoInterface>() {
    return this._get<T>({ url: "me" });
  }

  confirmEmail(emailAddress: string, code: string): Observable<UserDtoInterface> {
    return this._post(null, {
      url: "ConfirmEmail",
      query: { emailAddress, code },
    });
  }

  resendConfirmEmail(): Observable<boolean> {
    return this._post(null, {
      url: "ResendConfirmEmail",
    });
  }

  forgotPassword(emailAddress: string): Observable<boolean> {
    return this._post(null, {
      url: "ForgotPassword",
      query: { emailAddress },
    });
  }

  resetPassword(emailAddress: string, password: string, code: string): Observable<boolean> {
    const body = {
      emailAddress,
      password,
      code,
    };

    return this._post(body, { url: "ResetPassword" });
  }

  impersonate(identityId: string): Observable<UserDtoInterface> {
    return this._post(null, {
      url: "Impersonate",
      query: { identityId },
    });
  }

  abortImpersonate(): Observable<UserDtoInterface> {
    return this._post(null, {
      url: "AbortImpersonate",
    });
  }

  updateProfile(user: ProfileDtoInterface): Observable<boolean> {
    return this._post(user, { url: "UpdateProfile" });
  }
}
