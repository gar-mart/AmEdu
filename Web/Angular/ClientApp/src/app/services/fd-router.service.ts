import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FdRouterService {
  //#region Observables

  private routeConfigLoadStart = new Subject<RouteConfigLoadStart>();
  private routeConfigLoadEnd = new Subject<RouteConfigLoadEnd>();
  private navigationCancel = new Subject<NavigationCancel>();
  private navigationError = new Subject<NavigationError>();
  private navigationEnd = new Subject<NavigationEnd>();

  /**
   * We need to use a replay subject because most components (other than AppComponent) subscribe after the initial page load.
   * Use a buffer size of 1 so that we only cache the last fragment.
   */
  private fragment = new ReplaySubject<FdRoute>(1);

  // consumers can easily subscribe to these observable events as needed
  routeConfigLoadStart$ = this.routeConfigLoadStart.asObservable();
  routeConfigLoadEnd$ = this.routeConfigLoadEnd.asObservable();
  navigationCancel$ = this.navigationCancel.asObservable();
  navigationError$ = this.navigationError.asObservable();
  navigationEnd$ = this.navigationEnd.asObservable();
  fragment$ = this.fragment.asObservable();

  //#endregion

  private currentUrl: string;

  private _previousUrl: string;
  get previousUrl() {
    return this._previousUrl;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.routeConfigLoadStart.next(event);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.routeConfigLoadEnd.next(event);
      } else if (event instanceof NavigationCancel) {
        this.navigationCancel.next(event);
      } else if (event instanceof NavigationError) {
        this.navigationError.next(event);
      } else if (event instanceof NavigationEnd) {
        this.onNavigationEnd(event);
        this.navigationEnd.next(event);
      }
    });

    this.route.fragment.subscribe(fragment => {
      this.fragment.next(new FdRoute({ urlPath: fragment }));
    });
  }

  /**
   * An optional list of path parts. If empty, the fragment is removed.
   * Replaces this new state onto history.
   * @param route The list of path parts.
   */
  replaceFragment(...route: string[]) {
    this.setFragment(new FdRoute({ pathParts: route }), true);
  }

  /**
   * Sets a new fragment value onto the URL.
   * You should use replaceFragment instead of this method, unless you need the FdRoute parameter.
   * @param route The route to use as the fragment value.
   * @param replaceState Whether or not the new fragment state should push or replace history.
   */
  setFragment(route: FdRoute, replaceState: boolean) {
    const newFragment = route.toString();
    const url = new URL(location.href);
    url.hash = newFragment;

    // we must use the History API so that we don't trigger a hash change event
    if (replaceState) {
      history.replaceState(null, null, url.toString());
    } else {
      history.pushState(null, null, url.toString());
    }
  }

  private onNavigationEnd(event: NavigationEnd) {
    if (event.url !== this.currentUrl) {
      this._previousUrl = this.currentUrl;
      this.currentUrl = event.url;
    }
  }
}

export class FdRoute {
  private _path: string;
  private _queryParams: any;
  private _pathParts: string[];
  private _fragment: string;

  get path() {
    return this._path;
  }
  get queryParams() {
    return this._queryParams;
  }
  get pathParts() {
    return this._pathParts;
  }
  get fragment() {
    return this._fragment;
  }

  constructor();
  constructor(params: { path: string; queryParams?: any; fragment?: string });
  constructor(params: { pathParts: any[]; queryParams?: any; fragment?: string });
  constructor(params: { urlPath: string });
  constructor(params?: { path?: string; queryParams?: any; pathParts?: any[]; urlPath?: string; fragment?: string }) {
    if (!params) {
      this._path = "";
      this._queryParams = {};
      this._pathParts = [];
      return;
    }

    const { path, queryParams, pathParts, urlPath, fragment } = params;

    this._queryParams = queryParams || {};
    this._fragment = fragment;

    if (urlPath) {
      const [serverPath, fragmentPart] = urlPath.split("#");
      const [path, query] = serverPath.split("?");
      this._path = path;
      this._pathParts = path.split("/");
      this._fragment = fragmentPart;

      query?.split("&")?.forEach(keyValue => {
        const [key, value] = keyValue.split("=");
        if (key in this.queryParams) {
          if (Array.isArray(this.queryParams[key])) {
            this.queryParams[key].push(value);
          } else {
            this.queryParams[key] = [this.queryParams[key], value];
          }
        } else {
          this.queryParams[key] = value;
        }
      });
    } else if (pathParts) {
      this._path = pathParts.join("/");
      this._pathParts = pathParts.map(p => p?.toString());
    } else {
      this._path = path || "";
      this._pathParts = this.path.split("/");
    }
  }

  setFragment(...parts: string[]) {
    this._fragment = parts.join("/");
  }

  toString() {
    const queryString = new URLSearchParams(this.queryParams).toString();
    const url = queryString ? `${this.path}?${queryString}` : this.path;
    return this.fragment ? `${url}#${this.fragment}` : url;
  }
}
