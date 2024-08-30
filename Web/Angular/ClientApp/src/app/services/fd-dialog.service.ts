import { ComponentType } from "@angular/cdk/portal";
import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { BaseDialogComponent } from "../components/base-dialog.component";
import { FdRouterService } from "./fd-router.service";

/**
 * Wrapper for MatDialog.
 * Provides better input-output typing, etc.
 */
@Injectable({ providedIn: "any" }) // needs to be providedIn 'any', because if we choose to provide in 'root' we will get null injector errors related to implementations of BaseDialogComponent
export class FdDialog {
  private dialogFragmentIdentifiers = new Set<string>();

  constructor(private dialog: MatDialog, private router: FdRouterService) {}

  /** Register's a dialog's identifier with the "fragment" so that we may open a dialog from a route. */
  registerFragment(fragmentIdentifier: string, onMatch: (pathParts: string[]) => unknown) {
    this.dialogFragmentIdentifiers.add(fragmentIdentifier);

    this.router.fragment$.pipe(first()).subscribe(route => {
      if (route?.pathParts[0] === fragmentIdentifier && onMatch) {
        onMatch(route.pathParts);
      }
    });
  }

  /** Open's a component or template dialog with strong typing and optional fragment caching. */
  open<Output = never, Input = never>(
    dialog: DialogType<Input, Output>,
    config: FdDialogConfig<Input>
  ): MatDialogRef<Input, Output> {
    let replaceFragment = false;

    if (config?.fragment && config.fragment[0]) {
      if (!this.dialogFragmentIdentifiers.has(config.fragment[0])) {
        throw `You passed a fragment, however ${config.fragment[0]} has not been registered with registerFragment() using the FdDialog service.`;
      } else {
        replaceFragment = true;
        this.router.replaceFragment(...config.fragment.map(x => `${x}`));
      }
    }

    const ref = this.dialog.open(dialog, config);

    if (replaceFragment) {
      ref.afterClosed().subscribe(() => this.router.replaceFragment());
    }

    return ref;
  }
}

export type FdDialogConfig<Input> = MatDialogConfig<Input> & {
  backdropClass?: BackdropClass | BackdropClass[];
  fragment: string[];
};

/**
 * Note: "intrinsic" is used as a non-`null`, non-`undefined` behavior for the default functionality for the backdrop.
 */
export type BackdropClass = "sm" | "lg" | "xl" | "align-top" | "intrinsic";

export type DialogType<Input, Output> = ComponentType<BaseDialogComponent<Input, Output>> | TemplateRef<any>;
