export interface EngagementMetricItem {
  columns: EngagementMetricColumn[];
  data: EngagementMetricData[];
}

export interface EngagementMetricColumn {
  property: string;
  title: string;
}

export interface EngagementMetricData {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
}
