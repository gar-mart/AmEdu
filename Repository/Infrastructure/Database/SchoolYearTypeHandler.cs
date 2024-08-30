using System.Data;

using Dapper;

using Shared.Helpers;

namespace Repository.Infrastructure.Database;

internal class SchoolYearTypeHandler: SqlMapper.TypeHandler<SchoolYear>
{
    public override SchoolYear Parse(object value)
    {
        return new SchoolYear((int)value);
    }

    public override void SetValue(IDbDataParameter parameter, SchoolYear schoolYear)
    {
        parameter.Value = schoolYear.value;
        parameter.DbType = DbType.Int32;
    }
}
