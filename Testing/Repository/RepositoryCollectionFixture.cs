using System.Threading.Tasks;

using Microsoft.Extensions.Options;

using Repository.Infrastructure;

using Xunit;

namespace AutomatedTests.Repository;

/// <summary>
/// This class is used to define setup and teardown logic for all tests in the collection.
/// </summary>
public class RepositoryCollectionFixture: BaseFixture
{
    /// <summary>
    /// Defines Setup logic that should be run before each collection of tests.
    /// </summary>
    public RepositoryCollectionFixture(
            TestingRepository testingRepository,
            IOptions<AppConfigurations> appConfigurations)
        : base(testingRepository, appConfigurations)
    { }

    /// <summary>
    /// Defines Teardown logic that should be run after each collection of tests.
    /// </summary>
    public override void Dispose()
    {
    }

    /// <summary>
    /// Defines Setup logic that should be run before each collection of tests.
    /// </summary>
    /// <returns></returns>
    public override Task InitializeAsync()
    {
        return TestingRepository.GenerateDefaultDataAsync();
    }
}

/// <summary>
/// This class has no code, and is never created. Its purpose is simply
/// to be the place to apply <c>[CollectionDefinition]</c> and all the
/// <c>ICollectionFixture&lt;&gt;</c> interfaces.
/// </summary>
[CollectionDefinition(nameof(RepositoryCollection))]
public class RepositoryCollection: ICollectionFixture<RepositoryCollectionFixture>
{
}
