import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable, OnDestroy, inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserRoles } from "../enums/repository/user-roles.enum";
import { RouteConstants } from "../helpers/constants/routes.constants";
import { UserDtoInterface } from "../modules/account/models/user-dto.model";
import { AuthService } from "../services/auth/auth.service";

@Injectable({ providedIn: "root" })
export abstract class BaseComponent implements OnDestroy {
  // constants
  protected readonly RouteConstants = RouteConstants;
  protected readonly UserRoles = UserRoles;
  protected readonly environment = environment;

  // services
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  protected readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  protected readonly subscriptions: Subscription[] = [];

  get userContext(): UserDtoInterface {
    return this.authService.currentUser;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
