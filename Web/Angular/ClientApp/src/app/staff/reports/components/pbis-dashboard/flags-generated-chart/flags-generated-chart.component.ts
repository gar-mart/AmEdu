import { formatDate } from "@angular/common";
import { Component, ElementRef, Inject, Input, LOCALE_ID, OnChanges, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { AppComponent } from "../../../../../app.component";
import { FlagsGeneratedReportItem } from "../../../../../models/flags-generated-report-item";
import { StaffService } from "../../../../services";

@Component({
  selector: "app-flags-generated-chart",
  templateUrl: "./flags-generated-chart.component.html",
  styleUrls: ["./flags-generated-chart.component.scss"],
})
export class FlagsGeneratedChartComponent implements OnChanges {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() chartGroupingFilter: string;
  @Input() gradeLevelFilter: string[] | undefined;
  @Input() schoolFilter: string | undefined;
  @Input() mentorFilter: string | undefined;

  @ViewChild("myChart") ctx: ElementRef<HTMLCanvasElement>;

  private reportItems: FlagsGeneratedReportItem[] = [];
  private loading = true;

  private chart: Chart;

  constructor(
    private staffService: StaffService,
    private appComponent: AppComponent,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  private fetchData() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    setTimeout(() => (this.appComponent.isBusy = true));
    this.staffService
      .returnFlagsGeneratedReport(
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
    const labelSortFn =
      this.mentorFilter === "Mentor"
        ? (a, b) => a.localeCompare(b)
        : (a, b) => Number(a.replace("K", "0")) - Number(b.replace("K", "0"));
    const labels = new Set(
      this.effectiveReportItems()
        .filter(x => x.label)
        .map(x => x.label)
        .sort(labelSortFn)
    );
    const dates = new Set(this.effectiveReportItems().map(x => x.date));
    const datasets = [];

    labels.forEach(label => {
      const data: number[] = [];
      dates.forEach(date => {
        const entry = this.effectiveReportItems().filter(x => x.label === label && x.date === date);
        data.push(entry.length > 0 ? entry[0].flagCount : 0);
      });
      datasets.push({
        label: label,
        data: data,
      });
    });

    if (!this.chart) {
      this.chart = new Chart(this.ctx.nativeElement, {
        type: "line",

        data: {
          labels: [...dates].map(x => formatDate(x, "M/yyyy", this.locale)),
          datasets: datasets,
        },

        options: {
          maintainAspectRatio: false,
          indexAxis: "x",
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      this.chart.draw();
    } else {
      this.chart.data.datasets = datasets;
      this.chart.data.labels = [...dates].map(x => formatDate(x, "M/yyyy", this.locale));
      this.chart.update();
    }
  }
}
