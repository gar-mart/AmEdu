import { ComponentType } from "@angular/cdk/portal";
import { Injectable, TemplateRef } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

/**
 * Wrapper for MatSnackBar.
 * Provides reusable styles, actions, and configurations app-wide.
 */
@Injectable({ providedIn: "root" })
export class FdSnackBar {
  private defaultDuration = 5000;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Opens a snackbar with primary theming.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar. panelClass will be overridden.
   */
  openPrimary(message: string, action: string = "×", config: MatSnackBarConfig = {}) {
    if (!(config.duration > 0)) {
      config.duration = this.defaultDuration;
    }

    config.panelClass = "primary";
    return this.snackBar.open(message, action, config);
  }

  /**
   * Opens a snackbar with accent themeing.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar. panelClass will be overridden.
   */
  openAccent(message: string, action: string = "×", config: MatSnackBarConfig = {}) {
    if (!(config.duration > 0)) {
      config.duration = this.defaultDuration;
    }

    config.panelClass = "accent";
    return this.snackBar.open(message, action, config);
  }

  /**
   * Opens a snackbar with warn themeing.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar. panelClass will be overridden.
   */
  openWarn(message: string, action: string = "×", config: MatSnackBarConfig = {}) {
    if (!(config.duration > 0)) {
      config.duration = 10000;
    }

    config.panelClass = "warn";
    return this.snackBar.open(message, action, config);
  }

  /**
   * Opens a snackbar with default styles.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar. panelClass will be overridden.
   */
  open(message: string, action: string = "×", config: MatSnackBarConfig = {}) {
    if (!(config.duration > 0)) {
      config.duration = this.defaultDuration;
    }
    config.panelClass = "default";
    return this.snackBar.open(message, action, config);
  }

  //#region Default MatSnackBar Wrappers

  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss() {
    this.snackBar.dismiss();
  }

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromComponent<T>(component: ComponentType<T>, config?: MatSnackBarConfig) {
    if (!(config.duration > 0)) {
      config.duration = this.defaultDuration;
    }

    return this.snackBar.openFromComponent(component, config);
  }

  /**
   * Creates and dispatches a snack bar with a custom template for the content, removing any
   * currently opened snack bars.
   *
   * @param template Template to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromTemplate(template: TemplateRef<any>, config?: MatSnackBarConfig) {
    if (!(config.duration > 0)) {
      config.duration = this.defaultDuration;
    }

    return this.openFromTemplate(template, config);
  }
  //#endregion
}
