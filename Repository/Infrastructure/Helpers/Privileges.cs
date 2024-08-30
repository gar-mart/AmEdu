using System.Collections.Immutable;

namespace Repository.Infrastructure;

public static class Privileges
{
    public const string Edit = "1";
    public const string Delete = "2";

    public static readonly ImmutableHashSet<string> AdminPrivileges = ImmutableHashSet.Create(
        Edit,
        Delete
    );
}
