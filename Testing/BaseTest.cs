using System;
using System.Threading.Tasks;

using Xunit;

namespace AutomatedTests;

public abstract class BaseTest: IAsyncLifetime, IDisposable
{
    /// <summary>
    /// Defines Setup logic that should be run before each test.
    /// </summary>
    public BaseTest()
    {
    }

    /// <summary>
    /// Defines Teardown logic that should be run after each test.
    /// </summary>
    public virtual void Dispose()
    {
        GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Defines Setup logic that should be run before each test.
    /// </summary>
    /// <returns></returns>
    public virtual Task InitializeAsync()
    {
        return Task.CompletedTask;
    }

    /// <summary>
    /// Defines Teardown logic that should be run after each test.
    /// </summary>
    /// <returns></returns>
    public virtual Task DisposeAsync()
    {
        return Task.CompletedTask;
    }
}
