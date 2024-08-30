import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { NavigationService } from "@services/navigation.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private navigationService: NavigationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.navigationService.redirectUrl = state.url;
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
