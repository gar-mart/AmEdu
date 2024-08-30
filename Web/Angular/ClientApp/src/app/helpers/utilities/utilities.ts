import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, RendererFactory2 } from "@angular/core";

@Injectable({ providedIn: "root" })
export class Utilities {
  public static readonly captionAndMessageSeparator = ":";
  public static readonly noNetworkMessageCaption = "No Network";
  public static readonly noNetworkMessageDetail = "The server cannot be reached";
  public static readonly accessDeniedMessageCaption = "Access Denied!";
  public static readonly accessDeniedMessageDetail = "";
  public static readonly notFoundMessageCaption = "Not Found";
  public static readonly notFoundMessageDetail = "The target resource cannot be found";

  constructor(@Inject(DOCUMENT) private document, private renderer2: RendererFactory2) {}

  public appendScript(url: string) {
    var item = this.document.createElement("script");
    item.type = "text/javascript";
    item.src = url;
    this.renderer2.createRenderer(null, null).appendChild(this.document.body, item);
  }

  public static getQueryParamsFromString(paramString: string) {
    if (!paramString) {
      return null;
    }

    const params: { [key: string]: string } = {};

    for (const param of paramString.split("&")) {
      const keyValue = Utilities.splitInTwo(param, "=");
      params[keyValue.firstPart] = keyValue.secondPart;
    }

    return params;
  }

  public static splitInTwo(text: string, separator: string): { firstPart: string; secondPart: string } {
    const separatorIndex = text.indexOf(separator);

    if (separatorIndex === -1) {
      return { firstPart: text, secondPart: null };
    }

    const part1 = text.substr(0, separatorIndex).trim();
    const part2 = text.substr(separatorIndex + 1).trim();

    return { firstPart: part1, secondPart: part2 };
  }

  public static JsonTryParse(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      if (value === "undefined") {
        return void 0;
      }
      return value;
    }
  }

  public static toTitleCase(text: string) {
    return text.replace(/\w\S*/g, subString => {
      return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
    });
  }

  /** Dynamically determine the base URL from current URL. */
  public static baseUrl() {
    let base = "";

    if (window.location.origin) {
      base = window.location.origin;
    } else {
      base =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    }

    return base.replace(/\/$/, "");
  }
}
