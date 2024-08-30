import { Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { AppComponent } from "../../../../../app.component";
import { PointTypeAwardReportItem } from "../../../../../models/point-type-award-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-point-types-awarded-chart",
  templateUrl: "./point-types-awarded-chart.component.html",
  styleUrls: ["./point-types-awarded-chart.component.scss"],
})
export class PointTypesAwardedChartComponent implements OnChanges {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() chartGroupingFilter: string;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() schoolFilter: string | undefined;
  @Input() mentorFilter: string | undefined;

  @ViewChild("myChart") ctx: ElementRef<HTMLCanvasElement>;

  private reportItems: PointTypeAwardReportItem[] = [];
  private loading = true;

  private chart: Chart;

  constructor(private staffService: StaffService, private appComponent: AppComponent) {}

  private fetchData() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnPointTypesAwardedReport(
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
      (changes.startDate !== undefined && changes.endDate !== undefined) ||
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
      label: "Respect",
      data: this.effectiveReportItems().map(x => x.respectCount),
    });

    datasets.push({
      label: "Integrity",
      data: this.effectiveReportItems().map(x => x.integrityCount),
    });

    datasets.push({
      label: "Stewardship",
      data: this.effectiveReportItems().map(x => x.stewardshipCount),
    });

    datasets.push({
      label: "Engagement",
      data: this.effectiveReportItems().map(x => x.engagementCount),
    });

    datasets.push({
      label: "Communication",
      data: this.effectiveReportItems().map(x => x.communicationCount),
    });

    datasets.push({
      label: "Live Lesson",
      data: this.effectiveReportItems().map(x => x.lessonCount),
    });

    if (!this.chart) {
      this.chart = new Chart(this.ctx.nativeElement, {
        type: "bar",
        data: {
          labels: grades,
          datasets: datasets,
        },

        options: {
          maintainAspectRatio: false,
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
