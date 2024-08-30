import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Tab } from "app/models";

@Component({
  selector: "app-tab-group",
  templateUrl: "./tab-group.component.html",
  styleUrls: ["./tab-group.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  @Input() tabs: Tab[];

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  childTabActive(tab: Tab): boolean {
    return (
      tab.tabs &&
      tab.tabs.some(t => t.path === this.router.url || (t.tabs?.length && t.tabs.some(c => c.path === this.router.url)))
    );
  }

  childTabLabel(tab: Tab): string {
    let label = "";

    if (tab.path === this.router.url) {
      label = tab.label;
    } else if (this.childTabActive(tab)) {
      const labels = tab.tabs.map(t => this.childTabLabel(t));
      label = labels.filter(l => !!l)[0];
    }

    return label;
  }
}
