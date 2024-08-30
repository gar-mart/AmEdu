using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Staff.ReFuelInquiries;

[TableMetaData(nameof(Staff), "ReFuelInquiries", "ReFuelInquiry")]
public class ReFuelInquiryItem
{
    [Key]
    public DateOnly Date { get; set; }
    public string GeneralInquiry { get; set; }
    public string BreakfastInquiry { get; set; }
    public string LunchInquiry { get; set; }
}
