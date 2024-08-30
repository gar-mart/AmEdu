import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { AppTileMetadata } from "@models/app-tile-metadata.model";
import { ShortcutContent } from "@models/step-content.model";
import { AdminService } from "@services/admin.service";
import { CommonService } from "@services/common.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shortcut-content",
  templateUrl: "./shortcut-content.component.html",
  styleUrls: ["./shortcut-content.component.scss"],
})
export class ShortcutContentComponent implements OnInit, OnDestroy {
  @Input() content: ShortcutContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Output() edit = new EventEmitter<void>();

  appShortcut: AppTileMetadata;
  filterAppShortcut: AppTileMetadata[];
  shortcutFilter = new UntypedFormControl();
  appShortcuts: AppTileMetadata[];
  selectedAppShortcuts: AppTileMetadata[] = [];
  displayedColumns: string[] = ["moreOptions", "title", "url"];

  subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService, private commonService: CommonService) {}

  ngOnInit() {
    if (this.content?.appTileMetadataId) {
      this.commonService.returnAppShortcutById(this.content.appTileMetadataId).subscribe(r => {
        if (r) {
          this.selectedAppShortcuts.push(r);
        }
      });
    }

    if (this.editMode) {
      this.adminService.returnAppShortcutsBySearch("").subscribe(r => {
        this.appShortcuts = r;
      });

      this.subscriptions.push(
        this.shortcutFilter.valueChanges.subscribe(val => {
          if (val.id && this.selectedAppShortcuts.length === 0) {
            this.selectedAppShortcuts.push(val);
            this.content.appTileMetadataId = val.id;

            this.commonService.returnAppShortcutById(val.id).subscribe(r => {
              if (r) {
                this.appShortcut = r;
              }
            });

            this.adminService.returnAppShortcutsBySearch("").subscribe(r => {
              this.filterAppShortcut = r;
            });

            this.edit.emit();
          } else if (val) {
            this.filterAppShortcut = this.appShortcuts.filter(x => x.title.toLowerCase().includes(val.toLowerCase()));
          }
        })
      );
    }

    if (this.content.appTileMetadataId) {
      this.commonService.returnAppShortcutById(this.content.appTileMetadataId).subscribe(r => {
        if (r) {
          this.appShortcut = r;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  displayShortcut() {
    return "";
  }

  deleteAppTileMetadata(selectedRow: AppTileMetadata) {
    this.selectedAppShortcuts = [];
    this.content.appTileMetadataId = 0;
    this.appShortcut = {} as AppTileMetadata;
    this.edit.emit();
  }
}
