import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RouteConstants } from "src/app/helpers/constants/routes.constants";
import { ConfirmEmailComponent } from "./components/confirm-email/confirm-email.component";
import { ExternalLoginCallbackComponent } from "./components/external-login-callback/external-login-callback.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      ...RouteConstants.account.confirmEmail.toRoutes(ConfirmEmailComponent),
      ...RouteConstants.account.registration.toRoutes(RegistrationComponent),
      ...RouteConstants.account.externalLoginCallback.toRoutes(ExternalLoginCallbackComponent),
      ...RouteConstants.account.forgotPassword.toRoutes(ForgotPasswordComponent),
      ...RouteConstants.account.resetPassword.toRoutes(ResetPasswordComponent),
      ...RouteConstants.account.profile.toRoutes(ProfileComponent),
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
