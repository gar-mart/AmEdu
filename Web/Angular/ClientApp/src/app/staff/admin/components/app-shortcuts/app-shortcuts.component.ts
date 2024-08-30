import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService } from "@services/admin.service";
import { Utility } from "app/shared";
import { AppTileMetadata } from "../../../../models";
import { AppShortcutDialogComponent } from "./app-shortcut-dialog/app-shortcut-dialog.component";

@Component({
  selector: "app-shortcuts",
  templateUrl: "./app-shortcuts.component.html",
  styleUrls: ["./app-shortcuts.component.scss"],
})
export class AppShortcutsComponent implements OnInit {
  displayedColumns: string[] = ["actions", "icon", "title", "url", "cannotBeHidden", "shownByDefault", "gradeLevels"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  grades: string[] = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadDatatable();
  }

  loadDatatable() {
    this.adminService.returnAppShortcuts().subscribe(result => {
      //Build out GradeLevel strings.
      const resultWithStrings = this.buildGradeLevelStrings(result);
      this.dataSource = new MatTableDataSource(resultWithStrings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  buildGradeLevelStrings(records: AppTileMetadata[]) {
    for (var i = 0; i < records.length; i++) {
      const record = records[i];
      let gradeLevels = record.appTileGradeLevels.map(item => item.gradeLevel);
      record.gradeLevelString = Utility.buildGradeLevelString(gradeLevels);
      records[i] = record;
    }
    return records;
  }

  newShortcut() {
    this.dialog
      .open(AppShortcutDialogComponent)
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDatatable();
        }
      });
  }

  editShortcut(id: number) {
    this.dialog
      .open(AppShortcutDialogComponent, {
        data: id,
      })
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.loadDatatable();
        }
      });
  }
}
