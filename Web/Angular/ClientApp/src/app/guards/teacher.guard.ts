import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { User } from "app/models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class TeacherGuard implements CanActivate {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authorizationService.user.isTeacher || this.authorizationService.user.isAdmin
      ? true
      : this.authorizationService.getUserByUserName(this.authService.currentUser.email).pipe(
          map(user => {
            if (user.isTeacher || user.isAdmin) {
              return true;
            } else {
              this.router.navigateByUrl("/");
              return false;
            }
          })
        );
  }
}
