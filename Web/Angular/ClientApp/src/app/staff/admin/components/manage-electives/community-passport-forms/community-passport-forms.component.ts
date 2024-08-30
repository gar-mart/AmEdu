import { Component, OnInit } from "@angular/core";
import { CommunityPassportForm } from "@models/community-passport-form.model";
import { OrientationService } from "@services/orientation.service";
import { Cell } from "app/enums/cell.enum";
import { StaffService } from "app/staff/services";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-community-passport-forms",
  templateUrl: "./community-passport-forms.component.html",
  styleUrls: ["./community-passport-forms.component.scss"],
})
export class CommunityPassportFormsComponent implements OnInit {
  isUpdating = false;
  communityPassportForms: CommunityPassportForm[];

  constructor(private orientationService: OrientationService, private staffService: StaffService) {}

  ngOnInit(): void {
    this.orientationService.returnCommunityPassportForms().subscribe(forms => {
      // use the existing form, or a default item if one doesn't exist
      this.communityPassportForms = [
        forms.find(f => f.cell === Cell.ElementarySchool) ?? { cell: Cell.ElementarySchool, url: "" },
        forms.find(f => f.cell === Cell.MiddleSchool) ?? { cell: Cell.MiddleSchool, url: "" },
        forms.find(f => f.cell === Cell.HighSchool) ?? { cell: Cell.HighSchool, url: "" },
      ];
    });
  }

  save() {
    this.isUpdating = true;
    this.staffService
      .updateCommunityPassportForms(this.communityPassportForms)
      .pipe(finalize(() => (this.isUpdating = false)))
      .subscribe();
  }
}
