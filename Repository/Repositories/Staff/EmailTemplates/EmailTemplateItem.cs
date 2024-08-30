using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

namespace Repository.Repositories.Staff;

[TableMetaData(nameof(Staff), "EmailTemplates", "EmailTemplate")]
public class EmailTemplateItem: IBaseModel
{
    [Key]
    public new int Id { get; set; }
    [FdIgnore] // the currentUserId is used instead to update this value
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Html { get; set; }
}
