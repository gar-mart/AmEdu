import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { RouteConstants } from "src/app/helpers/constants/routes.constants";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(protected authService: AuthService, protected router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.check(url, route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.check(url);
  }

  private check(url: string, route: ActivatedRouteSnapshot = null): boolean {
    if (this.authService.isLoggedIn) {
      return this.userConfirmedEmail(url) && this.userIsAuthorized(route);
    }

    this.authService.loginRedirectUrl = url;
    this.router.navigateByUrl(RouteConstants.login.routerLink);

    return false;
  }

  private userConfirmedEmail(url: string) {
    if (!this.authService.currentUser.emailConfirmed && this.authService.currentUser.email) {
      this.authService.loginRedirectUrl = url;
      this.router.navigateByUrl("/account/confirm-email");
      return false;
    }

    return true;
  }

  private userIsAuthorized(route: ActivatedRouteSnapshot) {
    if (route) {
      // check that the user is authorized to access this route
      const roleArea = route.data["roleArea"];
      const roleView = route.data["roleView"];

      if (!this.authService.currentUser.hasAnyViewRole(roleArea) || !this.authService.currentUser.isInRole(roleView)) {
        this.router.navigateByUrl(RouteConstants.notAuthorized.routerLink, {
          skipLocationChange: true,
        });
        return false;
      }
    }

    return true;
  }
}
