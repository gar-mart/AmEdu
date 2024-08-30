using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;

namespace Repository.Repositories.Staff;

[TableMetaData(nameof(Staff), "CommunicationLists", "CommunicationList")]
public class CommunicationListItem
{
    [Key]
    public int Id { get; set; }
    public int StaffId { get; set; }
    public string Name { get; set; }
}
