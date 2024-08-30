import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthCallbackComponent, EmailOptOutComponent, LoginComponent, ResourcesComponent } from "./components";
import { NotAuthorizedComponent, PageNotFoundComponent } from "./design";
import { AuthenticationGuard, AuthorizationGuard, StaffGuard } from "./guards";

// Route table
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "staff",
    loadChildren: () => import("./staff/staff.module").then(m => m.StaffModule),
    canActivate: [AuthenticationGuard, StaffGuard],
  },
  {
    path: "student",
    loadChildren: () => import("./student/student.module").then(m => m.StudentModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: "authCallback",
    redirectTo: "auth-callback",
  },
  {
    path: "auth-callback",
    component: AuthCallbackComponent,
  },
  {
    path: "resources",
    component: ResourcesComponent,
  },
  {
    path: "emailOptOut/:studentGoogleId", // used by azure functions
    redirectTo: "email-opt-out/:studentGoogleId",
  },
  {
    path: "email-opt-out/:studentGoogleId",
    component: EmailOptOutComponent,
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent,
  },
  {
    path: "not-authorized",
    component: NotAuthorizedComponent,
  },
  {
    path: "",
    component: AppComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
  },
  {
    path: "**",
    redirectTo: "page-not-found",
  },
  // these redirects only exist as they were the previous routes
  {
    path: "admin",
    redirectTo: "staff/admin",
  },
  {
    path: "mentor",
    redirectTo: "staff/mentor",
  },
  {
    path: "reports",
    redirectTo: "staff/reports",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
