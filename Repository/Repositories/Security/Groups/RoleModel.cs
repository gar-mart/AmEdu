using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;

using Microsoft.AspNetCore.Identity;

namespace Repository.Repositories.Security.Groups;

public sealed class RoleModel: IdentityRole<Guid>
{
    private static readonly Regex _nameRegex = new("([A-Z][a-z]+)");

    /// <inheritdoc/>
    public RoleModel() { }

    /// <inheritdoc />
    public RoleModel(string roleName) : base(roleName) { }

    [NotMapped]
    public bool IsSelected { get; set; }
    [NotMapped]
    public string SourceList { get; set; }
    [NotMapped]
    public bool IsOverride => SourceList?.Contains("User Override") ?? false;
    [NotMapped]
    public bool IsRevoke => Name.EndsWith("|REVOKE");
    [NotMapped]
    public string Area => Name.Split('_', '|')[0];
    [NotMapped]
    public string AreaName => _nameRegex.Replace(Area, (m) => " " + m.Captures.First()).Trim();
    [NotMapped]
    public string View => Name.Contains("_") ? IsCustom && Name.Split('_').Length == 2 ? "Custom" : Name.Split("_")[1] : "";
    [NotMapped]
    public string ViewName => _nameRegex.Replace(View, (m) => " " + m.Captures.First()).Trim();
    [NotMapped]
    public bool IsCustom => Name.Split('_').Length == 2 || !(Name.EndsWith("_View") || Name.EndsWith("_Edit") || Name.EndsWith("_View|REVOKE") || Name.EndsWith("_Edit|REVOKE"));
    [NotMapped]
    public bool IsMeta => !Name.Contains('_');
    [NotMapped]
    public string RoleName => _nameRegex.Replace(Name.Split("_").Last(), (m) => " " + m.Captures.First()).Trim();
    [NotMapped]
    public string SortString
    {
        get
        {
            var sortString = IsCustom ? "1" : "0";
            if (!IsCustom)
            {
                if (Name.EndsWith("_View") || Name.EndsWith("_View|REVOKE"))
                {
                    sortString += "1";
                }
                else if (Name.EndsWith("_Edit") || Name.EndsWith("_Edit|REVOKE"))
                {
                    sortString += "2";
                }
                else
                {
                    sortString += "3";
                }
            }
            sortString += Name;
            return sortString;
        }
    }
}
