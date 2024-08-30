import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DotNetConstants {
  public static readonly EmptyGuid = "00000000-0000-0000-0000-000000000000";
  public static readonly MinDate = new Date(1753, 0, 1);
  public static readonly MaxDate = new Date(9999, 11, 12);
}
