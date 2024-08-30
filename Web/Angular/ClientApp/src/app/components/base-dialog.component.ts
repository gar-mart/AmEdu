import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable, OnDestroy, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { environment } from "environments/environment";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { UserRoles } from "../enums/repository/user-roles.enum";
import { RouteConstants } from "../helpers/constants/routes.constants";
import { UserDtoInterface } from "../modules/account/models/user-dto.model";
import { AuthService } from "../services/auth/auth.service";
import { BackdropClass } from "../services/fd-dialog.service";

@Injectable({ providedIn: "root" })
export abstract class BaseDialogComponent<Input = never, Output = never> implements OnDestroy {
  // define abstract properties first so that we can use them when setting other props

  /**
   * The backdrop class to apply to this dialog. If your dialog "jumps" around in size, then you should set a backdrop class to constrain the dialog to a specific size.
   * Otherwise, if your dialog doesn't shift in size, you can just pass "intrinsic" to allow the dialog to be it's intrinsic size.
   */
  protected abstract get backdropClass(): BackdropClass | BackdropClass[];

  protected input: Input = inject(MAT_DIALOG_DATA);

  //#region BaseComponent Functionality
  /*
   * HACK: Extending BaseComponent will cause this issue: https://github.com/angular/angular-cli/issues/15077.
   * TODO: Figure out how to resolve that issue, extend BaseComponent, and remove this region.
   */

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
  //#endregion

  protected dialogRef: MatDialogRef<BaseDialogComponent<Input, Output>> = (() => {
    const dialogRef = inject(MatDialogRef<BaseDialogComponent<Input, Output>>);

    // note: we cannot use the constructor to access backdropClass since it is an abstract property
    const backdropClass = [
      "cdk-overlay-dark-backdrop", // always add the dark backdrop as per our best practices
      ...(Array.isArray(this.backdropClass) ? this.backdropClass : [this.backdropClass]),
    ].filter(x => !!x && x !== "intrinsic"); // don't add "intrinsic" since it just identifies the default behavior

    // note: we can only access the backdrop by using the document API from this context.
    const backdrop: HTMLElement = document.querySelector(".cdk-overlay-backdrop");
    backdrop.classList.add(...backdropClass);

    return dialogRef;
  })();

  protected close(output?: Output) {
    this.dialogRef.close(output);
  }
}
