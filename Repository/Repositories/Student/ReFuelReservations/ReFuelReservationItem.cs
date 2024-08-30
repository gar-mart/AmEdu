using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Student;

[TableMetaData(nameof(Student), "ReFuelReservations", "ReFuelReservation")]
public class ReFuelReservationItem: IAuditModel
{
    [Key]
    public int StudentId { get; set; }
    [Key, DataType(DataType.Date)]
    public DateTime Date { get; set; }
    public ReFuelReservationRejectReason? RejectReasonType { get; set; }
    public string RejectReasonComment { get; set; }
    [FdIgnore] // set by the procedure internally
    public int? StandbyPosition { get; set; }
    [FdIgnore]
    public ReFuelReservationType Type { get; set; } = ReFuelReservationType.Breakfast & ReFuelReservationType.Lunch;
    [FdIgnore]
    public string GeneralInquiryResponse { get; set; }
    [FdIgnore]
    public string BreakfastInquiryResponse { get; set; }
    [FdIgnore]
    public string LunchInquiryResponse { get; set; }
}
