using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using FD.Base.Shared.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Staff.QuoteOfTheDay;

public class QuoteOfTheDayRepository: BaseAppRepository<QuoteOfTheDayItem, QuoteOfTheDayModel>
{
    public QuoteOfTheDayRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<QuoteOfTheDayRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<QuoteOfTheDayModel>> GetListAsync(IUserContext userContext, DateTime date)
    {
        return CommandBuilder
            .GetListBuilder(userContext)
            .AddModel(new { date })
            .QueryListAsync<QuoteOfTheDayModel>();
    }

    public Task<QuoteOfTheDayModel> GetQuoteOfTheDay(DateTime date)
    {
        return CommandBuilder
            .CoreBuilder()
            .AddModel(new { date })
            .ForStoredProcedure("Student.ReturnQuoteOfTheDay")
            .QuerySingleAsync<QuoteOfTheDayModel>();
    }

    public Task<int> CreateAsync(IUserContext userContext, QuoteOfTheDayItem item, DateTime date)
    {
        return CommandBuilder
            .InsertBuilder(userContext)
            .AddModel(item)
            .AddModel(new { date })
            .ExecuteCreateAsync();
    }

    public Task<bool> UpdateAsync(IUserContext userContext, QuoteOfTheDayItem item, DateTime date)
    {
        return CommandBuilder
            .UpdateBuilder(userContext)
            .AddModel(item)
            .AddModel(new { date })
            .ExecuteCommonAsync();
    }

    public Task<bool> DeleteAsync(IUserContext userContext, int id)
    {
        return base.DeleteAsync(userContext, id);
    }
}
