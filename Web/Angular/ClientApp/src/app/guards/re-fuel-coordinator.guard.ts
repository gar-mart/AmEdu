import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ReFuelCoordinatorGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authorizationService.user.isAdmin || this.authorizationService.user.isReFuelCoordinator
      ? true
      : this.authorizationService.getUserByUserName(this.authService.currentUser.email).pipe(
          map(user => {
            if (!user.isAdmin) {
              this.router.navigateByUrl("/");
            }

            return user.isAdmin;
          })
        );
  }
}
