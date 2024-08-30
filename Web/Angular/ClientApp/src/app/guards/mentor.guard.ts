import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MentorGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.currentUser.isMentor
      ? true
      : this.authorizationService.getUserByUserName(this.authService.currentUser.email).pipe(
          map(user => {
            if (user.isMentor) {
              return true;
            } else {
              this.router.navigateByUrl("/");
              return false;
            }
          })
        );
  }
}
