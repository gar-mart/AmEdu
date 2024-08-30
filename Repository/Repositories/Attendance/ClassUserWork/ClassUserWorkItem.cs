using System;

namespace Repository.Repositories.Attendance;

public class ClassUserWorkItem
{
    #region PK
    /// <summary>
    /// <see cref="ClassId"/> and <see cref="ItemId"/> are a FK to <see cref="ClassWorkItem"/>
    /// </summary>
    public int ClassId { get; set; }
    /// <inheritdoc cref="ClassId" />
    public int ItemId { get; set; }
    public int UserId { get; set; }
    /// <summary>
    /// This refers to the submission attempt #. 
    /// Students can turn in the same assignment more than once.
    /// </summary>
    public int WorkId { get; set; }
    #endregion

    public DateTime SubmittedDate { get; set; }
    public DateTime? ScoredDate { get; set; }
    public decimal PointsPossible { get; set; }
    public decimal PointsAchieved { get; set; }
}
