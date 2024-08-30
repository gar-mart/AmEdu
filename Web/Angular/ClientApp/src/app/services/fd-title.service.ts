import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Data, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class FdTitleService {
  static readonly delimiter = " - ";

  sub: Subscription;
  appName: string;
  currentRouteData: Data;

  constructor(private titleService: Title, private router: Router) {
    this.sub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(_ => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => this.setTitleFromRouteData(data));
  }

  resetToCurrentRoute() {
    this.setTitleFromRouteData(this.currentRouteData);
  }

  setTitleFromRouteData(data: Data) {
    this.currentRouteData = data;

    if (data) {
      this.setTitle(true, data.title);
    }
  }

  appendToTitle(titleToAppend: string) {
    this.setTitle(false, titleToAppend, this.titleService.getTitle());
  }

  setTitle(includeAppName: boolean, ...titles: string[]) {
    let title = titles.filter(t => t).join(FdTitleService.delimiter);

    if (includeAppName) {
      if (title && this.appName) {
        title += FdTitleService.delimiter + this.appName;
      } else if (this.appName) {
        title = this.appName;
      }
    }

    if (title) {
      this.titleService.setTitle(title);
    }
  }

  getTitle() {
    return this.titleService.getTitle();
  }
}
