import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { AppComponent } from "../../../../../app.component";
import { PointSourceStaffReportItem } from "../../../../../models/point-source-staff-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-point-source-staff-chart",
  templateUrl: "./point-source-staff-chart.component.html",
  styleUrls: ["./point-source-staff-chart.component.scss"],
})
export class PointSourceStaffChartComponent implements OnChanges {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() chartGroupingFilter: string;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() schoolFilter: string | undefined;
  @Input() mentorFilter: string | undefined;

  @ViewChild("myChart") ctx: ElementRef<HTMLCanvasElement>;

  private reportItems: PointSourceStaffReportItem[] = [];
  private loading = true;

  private chart: Chart;

  constructor(private staffService: StaffService, private appComponent: AppComponent) {}

  private fetchData() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnPointSourceStaffReport(
        this.startDate,
        this.endDate,
        this.chartGroupingFilter,
        this.schoolFilter,
        this.mentorFilter
      )
      .subscribe(reportItems => {
        this.reportItems = reportItems;
        this.updateChart();
        this.appComponent.isBusy = false;
      })
      .add(() => (this.loading = false));
  }
  ngOnChanges(changes: any): void {
    if (
      changes.startDate !== undefined ||
      changes.endDate !== undefined ||
      changes.chartGroupingFilter !== undefined ||
      changes.schoolFilter !== undefined ||
      changes.mentorFilter !== undefined
    ) {
      this.fetchData();
    } else {
      this.updateChart();
    }
  }

  private effectiveReportItems() {
    if (this.chartGroupingFilter === "Cell") {
      return this.reportItems;
    }

    if (!this.gradeLevelFilter || this.gradeLevelFilter.length === 0) {
      return this.reportItems;
    }
    return this.reportItems.filter(x => this.gradeLevelFilter.findIndex(y => y === x.label) !== -1);
  }

  private updateChart() {
    const grades = this.effectiveReportItems().map(x => x.label);
    const datasets = [];
    datasets.push({
      label: "Mentor",
      data: this.effectiveReportItems().map(x => x.mentorCount),
    });

    datasets.push({
      label: "Teacher",
      data: this.effectiveReportItems().map(x => x.teacherCount),
    });

    datasets.push({
      label: "Other",
      data: this.effectiveReportItems().map(x => x.otherCount),
    });

    if (!this.chart) {
      this.chart = new Chart(this.ctx.nativeElement, {
        type: "bar",
        data: {
          labels: grades,
          datasets: datasets,
        },

        options: {
          indexAxis: "y",
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });

      this.chart.draw();
    } else {
      this.chart.data.datasets = datasets;
      this.chart.data.labels = grades;
      this.chart.update();
    }
  }
}
