using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;

using FD.Base.Shared.Extensions;
using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;
using FD.Base.Shared.Repository.Infrastructure.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Repository.Repositories.Security.Groups;

namespace Repository.Repositories.Security.Users;

[TableMetaData(nameof(Common), "Users", "User")]
public sealed class ApplicationIdentityUser: IdentityUser<Guid>, IUserContext, IUserDto, IAuditInterface, IWith<GroupModel, ApplicationIdentityUser>
{
    private const string EMAIL_CODE_SECRET = "8526EDF517AD45089761A96CCB9525E6"; // probably best practice to use a new secret for each app
    private static readonly HashSet<string> _claimProperties;

    public ApplicationIdentityUser() { }
    public ApplicationIdentityUser(ClaimsPrincipal claimsPrincipal)
    {
        foreach (var property in typeof(ApplicationIdentityUser).GetProperties())
        {
            if (_claimProperties.Contains(property.Name))
            {
                var value = claimsPrincipal.FindFirstValue(property.Name);
                var type = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;

                if (value == null || value == string.Empty)
                {
                    property.SetValue(this, default);
                }
                else if (type == typeof(bool))
                {
                    property.SetValue(this, bool.Parse(value));
                }
                else if (type == typeof(int))
                {
                    property.SetValue(this, int.Parse(value));
                }
                else if (type == typeof(DateTime))
                {
                    property.SetValue(this, DateTime.Parse(value));
                }
                else if (type == typeof(Guid))
                {
                    property.SetValue(this, Guid.Parse(value));
                }
                else if (type == typeof(DateTimeOffset))
                {
                    property.SetValue(this, DateTimeOffset.Parse(value));
                }
                else if (property.PropertyType.IsEnum)
                {
                    property.SetValue(this, Enum.Parse(property.PropertyType, value));
                }
                else
                {
                    property.SetValue(this, value);
                }
            }
        }
    }


    static ApplicationIdentityUser()
    {
        _claimProperties = new HashSet<string>(typeof(ApplicationIdentityUser).GetProperties()
            .Where(p => p.GetSetMethod() != null)
            .Where(prop => !Attribute.IsDefined(prop, typeof(FdIgnoreAttribute)))
            .Select(p => p.Name));
    }

    #region Not Mapped Properties
    [NotMapped]
    public Guid? ImpersonatingIdentityId { get; set; }
    [NotMapped]
    public DateTime ContextInitializedDate { get; set; }
    [NotMapped]
    public string TimeZoneId { get; set; }
    [NotMapped, Display(Name = "Full Name")]
    public string FullName => $"{FirstName} {LastName}";
    [NotMapped]
    public string EmailCode => Email.EncodeString(EMAIL_CODE_SECRET); // you can use this code when verifying an email address for example. You can also use EmailAddress.Encrypt(_emailCodeSecret) and <encryptedText>.Decrypt(_emailCodeSecret) if you want to generate different encryptions.
    [NotMapped]
    public bool SendInvitation { get; set; }
    [NotMapped]
    public string Password { get; set; }
    [NotMapped]
    public DateTime CurrentDateTime => DateTime.UtcNow.ConvertToTimeZone(TimeZoneId);
    /// <summary>
    /// Users are considered stale if the app is restarted or if they have been marked stale via <see cref="MarkUserStale(int)"/>.
    /// </summary>
    [NotMapped]
    public bool IsStale => !_userClaimsMarkedStaleMap.TryGetValue(UserId, out var staleDate) || staleDate > ContextInitializedDate;
    [NotMapped]
    public bool IsNew => UserId == 0;
    [NotMapped]
    public string CreatedUserName { get; set; }
    [NotMapped]
    public string UpdatedUserName { get; set; }
    [NotMapped]
    public IEnumerable<string> CounselorAssignments { get; set; }
    [NotMapped, FdIgnore, Display(Name = "Security Groups")]
    public IEnumerable<Guid> SecurityGroupList { get; set; } = new List<Guid>();
    [NotMapped, FdIgnore]
    public IEnumerable<string> Roles { get; set; } = new List<string>();
    [NotMapped, FdIgnore]
    public DateTime? InactivedDate { get; set; }
    [NotMapped, FdIgnore]
    public int? InactivatedUserId { get; set; }
    [NotMapped, FdIgnore]
    public string InactivatedUserName { get; set; }
    #endregion

    #region Mapped Properties
    // these properties are "Mapped" so they must exist on the Identity database table AspNetUsers
    public int TenantId { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public int UserId { get; set; }
    public int SliceId { get; set; }
    [Required, Display(Name = "First Name")]
    public string FirstName { get; set; }
    [Required, Display(Name = "Last Name")]
    public string LastName { get; set; }
    public bool IsTriage { get; set; }
    [Display(Name = "Is Active")]
    public bool IsActive { get; set; } = true;
    [Required, EmailAddress]
    [Remote(action: "ValidateEmail", "Users", ErrorMessage = "Email already exists", AdditionalFields = "UserId")]
    public override string Email { get; set; }
    public string GradeLevel { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedDate { get; set; }
    public int? CreatedUserId { get; set; }
    public int? UpdatedUserId { get; set; }
    #endregion

    #region Stale User Logic
    private static readonly ConcurrentDictionary<int, DateTime> _userClaimsMarkedStaleMap = new();
    public static void MarkUserStale(int userId)
    {
        if (!_userClaimsMarkedStaleMap.TryAdd(userId, DateTime.UtcNow))
        {
            _userClaimsMarkedStaleMap[userId] = DateTime.UtcNow;
        }
    }
    public static void MarkAllUsersStale()
    {
        foreach (var user in _userClaimsMarkedStaleMap)
        {
            MarkUserStale(user.Key);
        }
    }
    public void InitializeContext()
    {
        ContextInitializedDate = DateTime.UtcNow;
        _userClaimsMarkedStaleMap[UserId] = ContextInitializedDate.AddDays(-1);
    }
    #endregion

    #region ConvertToClaims
    public IEnumerable<Claim> ConvertToClaims()
    {
        return typeof(ApplicationIdentityUser).GetProperties()
            .Where(p => _claimProperties.Contains(p.Name))
            .Select(p => new Claim(p.Name, p.GetValue(this)?.ToString() ?? string.Empty));
    }

    public object CommonParameters()
    {
        return new { currentUserId = UserId };
    }
    #endregion

    #region With

    public ApplicationIdentityUser With(IEnumerable<GroupModel> list)
    {
        SecurityGroupList = list.Select(s => s.Id);
        return this;
    }
    #endregion

    public DateTime ToUsersTime(DateTime value)
    {
        return value.Kind == DateTimeKind.Utc ? value.ConvertToTimeZone(TimeZoneId) : value;
    }

    public DateTime? ToUsersTime(DateTime? value)
    {
        return value.HasValue ? ToUsersTime(value.Value) : value;
    }
}
