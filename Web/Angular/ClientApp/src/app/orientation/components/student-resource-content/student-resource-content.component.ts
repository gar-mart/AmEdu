import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { StudentResourceContent } from "@models/step-content.model";
import { StudentResource } from "@models/student-resource.model";
import { AdminService } from "@services/admin.service";
import { CommonService } from "@services/common.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-student-resource-content",
  templateUrl: "./student-resource-content.component.html",
  styleUrls: ["./student-resource-content.component.scss"],
})
export class StudentResourceContentComponent implements OnInit, OnDestroy {
  @Input() content: StudentResourceContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Output() edit = new EventEmitter<void>();

  studentResource: StudentResource;
  filterStudentResource: StudentResource[];
  studentResourceFilter = new UntypedFormControl();
  studentResources: StudentResource[];
  selectedStudentResources: StudentResource[] = [];
  displayedColumns: string[] = ["moreOptions", "title", "url"];

  subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService, private commonService: CommonService) {}

  ngOnInit() {
    if (this.content?.studentResourceId) {
      this.commonService.returnStudentResourceById(this.content.studentResourceId).subscribe(r => {
        if (r) {
          this.selectedStudentResources.push(r);
        }
      });
    }

    if (this.editMode) {
      this.adminService.returnStudentResourcesBySearch("").subscribe(r => {
        this.studentResources = r;
      });

      this.subscriptions.push(
        this.studentResourceFilter.valueChanges.subscribe(val => {
          if (val.id && this.selectedStudentResources.length === 0) {
            this.selectedStudentResources.push(val);
            this.content.studentResourceId = val.id;

            this.commonService.returnStudentResourceById(val.id).subscribe(r => {
              if (r) {
                this.studentResource = r;
              }
            });

            this.adminService.returnStudentResourcesBySearch("").subscribe(r => {
              this.filterStudentResource = r;
            });

            this.edit.emit();
          } else if (val) {
            this.filterStudentResource = this.studentResources.filter(x =>
              x.title.toLowerCase().includes(val.toLowerCase())
            );
          }
        })
      );
    }

    if (this.content.studentResourceId) {
      this.commonService.returnStudentResourceById(this.content.studentResourceId).subscribe(r => {
        if (r) {
          this.studentResource = r;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  displayStudentResource() {
    return "";
  }

  deleteStudentResource(selectedRow: StudentResource) {
    this.selectedStudentResources = [];
    this.content.studentResourceId = 0;
    this.studentResource = {} as StudentResource;
    this.edit.emit();
  }
}
