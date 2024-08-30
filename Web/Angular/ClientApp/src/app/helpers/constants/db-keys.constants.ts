import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DBkeys {
  public static readonly CURRENT_USER = "current_user";
  public static readonly USER_PERMISSIONS = "user_permissions";
  public static readonly REMEMBER_ME = "remember_me";
  public static readonly LANGUAGE = "language";
  public static readonly HOME_URL = "home_url";
  public static readonly DRAWER_OPEN = "drawer_open";
  public static readonly PAGINATOR_SETTINGS = "paginator_settings";
}
