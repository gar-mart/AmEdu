import { Routes } from "@angular/router";
import { RouteConstants } from "./helpers/constants/routes.constants";

/** These routes will only be loaded in dev/testing builds */
export const routes: Routes = [
  RouteConstants.frameworkRoot.toLazyRoute(() =>
    import("./modules/framework/framework.module").then(m => m.FrameworkModule)
  ),
];
