using System;
using System.ComponentModel.DataAnnotations;

using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

using Microsoft.AspNetCore.Mvc;

namespace Repository.Repositories.Security.Groups;

[TableMetaData("Security", "AspNetGroups", "AspNetGroup")]
public class GroupItem: IAuditModel
{
    [Required, Key, FdIgnore(OnUpdate = false, OnSearch = false)]
    public Guid Id { get; set; }
    [Required, Remote(action: "ValidateName", "SecurityGroups", ErrorMessage = "Name already exists", AdditionalFields = "Id")]
    public string Name { get; set; }
    public string Description { get; set; }
}
