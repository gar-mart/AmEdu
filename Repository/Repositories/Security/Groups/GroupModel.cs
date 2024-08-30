using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using FD.Base.Shared.Models;

namespace Repository.Repositories.Security.Groups;

public sealed class GroupModel: GroupItem
    , IWith<RoleModel, GroupModel>
{
    [Display(Name = "User Count")]
    public int UserCount { get; set; }
    [Display(Name = "Roles Granted")]
    public int RolesGrantedCount { get; set; }
    [Display(Name = "Roles Revoked")]
    public int RolesRevokedCount { get; set; }
    public bool IsNew => Id == Guid.Empty;
    public bool IsDefault => Name == "Everyone";

    public IEnumerable<int> UserList { get; set; } = new List<int>();
    public IEnumerable<Guid> RoleList { get; set; } = new List<Guid>();
    public IEnumerable<RoleModel> AllRolesList { get; set; }

    public GroupModel With(IEnumerable<RoleModel> list)
    {
        RoleList = list.Where(s => s.IsSelected).Select(s => s.Id);
        AllRolesList = list;
        return this;
    }
}
