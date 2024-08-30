import { Injectable, Type } from "@angular/core";
import { Data, LoadChildren, Route } from "@angular/router";
import { AppEnvironment } from "src/app/enums/repository/app-environment.enum";
import { UserRoles } from "src/app/enums/repository/user-roles.enum";
import { AuthGuard } from "src/app/services/auth/auth-guard.service";
import { DirtyFormCanDeactivateGuard } from "src/app/services/forms/dirty-form-can-deactivate.guard";
import { environment } from "src/environments/environment";
import { Primitives } from "../types/primitives.type";

export interface IRouteInfo {
  label: string;
  showInMenu: boolean;
  routerLink?: string;
  externalLink?: string;
  children?: IRouteInfo[];
}

export class ExternalRouteInfo implements IRouteInfo {
  get showInMenu() {
    return this.data.showInMenu;
  }

  constructor(
    public parent: IRouteInfo,
    public label: string,
    public externalLink: string,
    public data: {
      showInMenu?: boolean;
      target?: string;
      newWindow?: boolean;
    }
  ) {
    data.showInMenu = data.showInMenu === true;
    if (data.newWindow) {
      data.target = "_blank";
    }

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(this);
    }
  }
}

export class RouteInfo<Params extends Primitives[] = Primitives[]> implements IRouteInfo {
  routerLink: string;
  children: IRouteInfo[];

  get label() {
    return this.data.title; // for now, just use the page's title
  }

  get showInMenu() {
    return this.data.showInMenu;
  }

  get allowAnonymous() {
    return this.data.allowAnonymous && !this.data.roleArea && !this.data.roleView;
  }

  constructor(
    public parent: RouteInfo,
    public path: string,
    public data: {
      title?: string;
      roleArea?: string;
      roleView?: string;
      showInMenu?: boolean;
      allowAnonymous?: boolean;
      isNestedRoot?: boolean;
    }
  ) {
    data.showInMenu = data.showInMenu !== false;
    data.allowAnonymous = data.allowAnonymous === true;
    data.isNestedRoot = data.isNestedRoot === true;

    this.routerLink = `${parent?.routerLink ?? ""}/${path.split("/:")[0]}`.replace("//", "/");

    if (parent) {
      if (parent.data.isNestedRoot) {
        this.path = `${parent.path}/${path}`;
      }

      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(this);
    }
  }

  toRoutes(component: Type<any>, options?: { data: Data }): Route[] {
    let fullPath = "";

    return this.path.split("/:?").map(path => {
      if (fullPath) {
        fullPath += "/:" + path;
      } else {
        fullPath = path;
      }

      return {
        path: fullPath,
        data: Object.assign({}, this.data, options?.data),
        component,
        canActivate: this.allowAnonymous ? undefined : [AuthGuard],
        canDeactivate: [DirtyFormCanDeactivateGuard],
      };
    });
  }

  toLazyRoute(loadChildren: LoadChildren, options?: { data: Data }): Route {
    return {
      path: this.path,
      data: Object.assign({}, this.data, options?.data),
      loadChildren,
      canActivate: this.allowAnonymous ? undefined : [AuthGuard],
      canDeactivate: [DirtyFormCanDeactivateGuard],
    };
  }

  buildRouterLink(...params: Params) {
    return [this.routerLink, ...params];
  }
}

@Injectable({ providedIn: "root" })
export class RouteConstants {
  public static readonly root = new RouteInfo(null, "", { title: "", allowAnonymous: true });

  public static readonly login = new RouteInfo(RouteConstants.root, "login", {
    title: "Login",
    showInMenu: false,
    allowAnonymous: true,
  });
  public static readonly home = new RouteInfo(RouteConstants.root, "home", { title: "Home", showInMenu: false });
  public static readonly notAuthorized = new RouteInfo(RouteConstants.root, "not-authorized", {
    title: "Not Authorized",
    showInMenu: false,
    allowAnonymous: true,
  });

  // #region Admin Module
  public static adminRoot = new RouteInfo(RouteConstants.root, "admin", { title: "Admin", roleArea: UserRoles.Admin });
  public static admin = {
    users: new RouteInfo(RouteConstants.adminRoot, "users", { title: "Users", roleView: UserRoles.Admin_Users_View }),
    securityGroups: new RouteInfo(RouteConstants.adminRoot, "security-groups", {
      title: "Security Groups",
      roleView: UserRoles.Admin_SecurityGroups_View,
    }),
  };
  // #endregion

  // #region Account Module
  public static accountRoot = new RouteInfo(null, "account", {
    title: "Account",
    showInMenu: false,
    allowAnonymous: true,
  });
  public static account = {
    registration: new RouteInfo(RouteConstants.accountRoot, "registration", {
      title: "Registration",
      allowAnonymous: true,
    }),
    externalLoginCallback: new RouteInfo(RouteConstants.accountRoot, "external-login-callback", {
      title: "Logging you in...",
      allowAnonymous: true,
    }),
    confirmEmail: new RouteInfo(RouteConstants.accountRoot, "confirm-email", {
      title: "Confirm Email",
      allowAnonymous: true,
    }),
    forgotPassword: new RouteInfo(RouteConstants.accountRoot, "forgot-password", {
      title: "Forgot Password",
      allowAnonymous: true,
    }),
    resetPassword: new RouteInfo(RouteConstants.accountRoot, "reset-password", {
      title: "Reset Password",
      allowAnonymous: true,
    }),
    profile: new RouteInfo(RouteConstants.accountRoot, "profile", { title: "Profile" }),
  };
  // #endregion

  // #region Framework Module
  public static frameworkRoot = new RouteInfo(RouteConstants.root, "framework", {
    title: "Framework",
    showInMenu: environment.configuration !== AppEnvironment.Production,
  });
  public static frameworkSwaggerRoot = new ExternalRouteInfo(RouteConstants.frameworkRoot, "Swagger", "/Swagger", {
    showInMenu: environment.configuration === AppEnvironment.Development,
    target: "swagger",
  });
  public static frameworkRinRoot = new ExternalRouteInfo(
    RouteConstants.frameworkRoot,
    "Request Inspector (Rin)",
    "/rin",
    { showInMenu: environment.configuration === AppEnvironment.Development, target: "rin" }
  );
  public static frameworkCoreRoot = new RouteInfo(RouteConstants.frameworkRoot, "core", {
    title: "Core",
    isNestedRoot: true,
  });
  public static frameworkControlsRoot = new RouteInfo(RouteConstants.frameworkRoot, "controls", {
    title: "Form Controls",
    isNestedRoot: true,
  });
  public static frameworkFilesRoot = new RouteInfo(RouteConstants.frameworkRoot, "files", {
    title: "Files",
    isNestedRoot: true,
  });
  public static frameworkWidgetsRoot = new RouteInfo(RouteConstants.frameworkRoot, "widgets", {
    title: "Widgets",
    isNestedRoot: true,
  });
  public static framework = {
    // core
    about: new RouteInfo(RouteConstants.frameworkCoreRoot, "about", { title: "About" }),
    email: new RouteInfo(RouteConstants.frameworkCoreRoot, "email", { title: "Email" }),
    errorHandling: new RouteInfo(RouteConstants.frameworkCoreRoot, "error-handling", { title: "Error Handling" }),
    dateTime: new RouteInfo(RouteConstants.frameworkCoreRoot, "date-time", { title: "Date & Time" }),
    form: new RouteInfo(RouteConstants.frameworkCoreRoot, "form", { title: "Form" }),
    globalLoadingIndicator: new RouteInfo(RouteConstants.frameworkCoreRoot, "global-loading-indicator", {
      title: "Global Loading Indicator",
    }),
    invalidModelState: new RouteInfo(RouteConstants.frameworkCoreRoot, "invalid-model-state", {
      title: "Invalid Model State ",
    }),
    pipes: new RouteInfo(RouteConstants.frameworkCoreRoot, "pipes", { title: "Pipes" }),
    prototyping: new RouteInfo(RouteConstants.frameworkCoreRoot, "prototyping", { title: "Prototyping" }),
    routeWithPathParameters: new RouteInfo<[number, string, boolean?]>(
      RouteConstants.frameworkCoreRoot,
      "route-with-id/:id/:name/:?flag",
      { title: "Route With ID", showInMenu: false }
    ),
    cache: new RouteInfo(RouteConstants.frameworkCoreRoot, "cache", { title: "Cache" }),
    // form controls
    autocomplete: new RouteInfo(RouteConstants.frameworkControlsRoot, "autocomplete", { title: "Autocomplete" }),
    checkbox: new RouteInfo(RouteConstants.frameworkControlsRoot, "checkbox", { title: "Checkbox" }),
    datepicker: new RouteInfo(RouteConstants.frameworkControlsRoot, "datepicker", { title: "Date / Time Picker" }),
    number: new RouteInfo(RouteConstants.frameworkControlsRoot, "number", { title: "Number" }),
    select: new RouteInfo(RouteConstants.frameworkControlsRoot, "select", { title: "Select" }),
    text: new RouteInfo(RouteConstants.frameworkControlsRoot, "text", { title: "Text" }),
    toggle: new RouteInfo(RouteConstants.frameworkControlsRoot, "toggle", { title: "Toggle" }),
    uploadFileControl: new RouteInfo(RouteConstants.frameworkControlsRoot, "upload-file", { title: "Upload File" }),
    // files
    uploadFile: new RouteInfo(RouteConstants.frameworkFilesRoot, "upload-file", { title: "Upload File" }),
    downloadFile: new RouteInfo(RouteConstants.frameworkFilesRoot, "download-file", { title: "Download File" }),
    buildCsv: new RouteInfo(RouteConstants.frameworkFilesRoot, "csv", { title: "Build CSV" }),
    buildXlsx: new RouteInfo(RouteConstants.frameworkFilesRoot, "xlsx", { title: "Build XLSX" }),
    buildPdf: new RouteInfo(RouteConstants.frameworkFilesRoot, "pdf", { title: "Build PDF" }),
    // widgets
    button: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "button", { title: "Button" }),
    chart: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "chart", { title: "Chart" }),
    confirmationPopover: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "confirmation-popover", {
      title: "Confirmation Popover",
    }),
    dataTables: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "data-tables", { title: "Data Tables" }),
    dialog: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "dialog", { title: "Dialog" }),
    notify: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "notify", { title: "Notify" }),
    popover: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "popover", { title: "Popover" }),
    tooltip: new RouteInfo(RouteConstants.frameworkWidgetsRoot, "tooltip", { title: "Tooltip" }),
  };
  // #endregion

  // #region External Links
  public static fdPortal = new ExternalRouteInfo(RouteConstants.root, "FD Portal", "https://portal.freedomdev.com", {
    showInMenu: true,
  });
  // #endregion
}
