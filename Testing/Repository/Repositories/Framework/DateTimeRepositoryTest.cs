using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

using FD.Base.Shared.Repository.Infrastructure.Database;

using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Framework.DateTime;

using Xunit;

using static AutomatedTests.Repository.Repositories.Framework.DateTimeRepositoryTest;

namespace AutomatedTests.Repository.Repositories.Framework;

[Collection(nameof(RepositoryCollection))]
public class DateTimeRepositoryTest: BaseTest, IClassFixture<Fixture>
{
    #region Setup
    private readonly RepositoryCollectionFixture _collectionFixture;
    private readonly Fixture _fixture;

    public DateTimeRepositoryTest(RepositoryCollectionFixture collectionFixture, Fixture fixture)
    {
        _collectionFixture = collectionFixture;
        _fixture = fixture;

        // configure transaction handling
        _ = _fixture.Repository.CreateUnitOfWork(true);
    }

    public override void Dispose()
    {
        GC.SuppressFinalize(this);
        _ = _fixture.Repository.DisposeUnitOfWork();
    }
    #endregion

    #region Tests
    [Fact]
    public async Task GetSingleAsync_Cause_Unique_Exception_Should_Throw()
    {
        var exception = await Record.ExceptionAsync(() => _fixture.Repository.GetSingleAsync(_fixture.UserContext, causeUniqueException: true));

        var databaseException = Assert.IsType<DatabaseException>(exception);
        var sqlException = Assert.IsType<SqlException>(exception.InnerException);

        Assert.Equal(2627, databaseException.Code);
        Assert.Equal(sqlException.Number, databaseException.Code);
    }

    [Fact]
    public async Task GetSingleAsync_Cause_Overflow_Exception_Should_Throw()
    {
        var exception = await Record.ExceptionAsync(() => _fixture.Repository.GetSingleAsync(_fixture.UserContext, causeOverflowException: true));

        var databaseException = Assert.IsType<DatabaseException>(exception);
        var sqlException = Assert.IsType<SqlException>(exception.InnerException);

        Assert.Equal(517, databaseException.Code);
        Assert.Equal(sqlException.Number, databaseException.Code);
    }

    [Fact]
    public async Task GetSingleAsync_Cause_Custom_Error_Should_Throw()
    {
        var exception = await Record.ExceptionAsync(() => _fixture.Repository.GetSingleAsync(_fixture.UserContext, causeError: true));

        var databaseException = Assert.IsType<DatabaseException>(exception);

        Assert.Null(databaseException.InnerException);
        Assert.Equal(1, databaseException.Code);
    }
    #endregion

    #region Class Fixture
    /// <summary>
    /// This class defines setup and teardown logic that should happen before and after all tests in a single class.
    /// </summary>
    public class Fixture: BaseFixture
    {
        public DateTimeRepository Repository { get; }

        public Fixture(
            TestingRepository testingRepository,
            IOptions<AppConfigurations> appConfigurations,
            DateTimeRepository repository
        ) : base(testingRepository, appConfigurations)
        {
            Repository = repository;
        }
    }
    #endregion
}
