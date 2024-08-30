using System;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Database;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;

namespace Repository.Repositories.Framework.Random;

public sealed class RandomRepository: BaseAppRepository<RandomItem>
{
    private static readonly ManagedCache<RandomItem> _randomCache = new(maxAge: TimeSpan.FromMinutes(1));


    public RandomRepository(IOptions<AppConfigurations> appConfigurations, ILogger<RandomRepository> logger) : base(appConfigurations, logger)
    {
        _randomCache.UpdateCachedValue = () => GetSingleAsync(false);
    }

    public async Task<RandomItem> GetSingleAsync(bool useCache = true, IUnitOfWork unitOfWork = null)
    {
        return useCache ? await _randomCache.GetValue() : await GetSingleAsync(unitOfWork);
    }
}
