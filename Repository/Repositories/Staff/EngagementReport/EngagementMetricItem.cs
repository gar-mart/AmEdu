using System.Collections.Generic;

namespace Repository.Repositories.Staff.EngagementReport;

public class EngagementMetricItem
{
    public IEnumerable<EngagementMetricColumn> Columns { get; set; }
    public IEnumerable<EngagementMetricData> Data { get; set; }

    public class EngagementMetricColumn
    {
        public string Property { get; set; }
        public string Title { get; set; }
    }

    /// <summary>
    /// Generic implementation for a variety of metric data. 
    /// Not all metrics will utilize all columns / data.
    /// </summary>
    public class EngagementMetricData
    {
        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
        public string Column6 { get; set; }
        public string Column7 { get; set; }
        public string Column8 { get; set; }
        public string Column9 { get; set; }
        public string Column10 { get; set; }
    }
}
