using Dapper;

namespace Repository.Infrastructure.Database;

public class DapperCommand
{
    public string Text { get; set; }
    public DynamicParameters Parameters { get; set; }
    public string ConnectionString { get; set; }
    public int GetReturnValue()
    {
        return Parameters.Get<int>("returnValue");
    }
}
