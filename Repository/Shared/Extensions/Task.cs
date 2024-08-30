using System;
using System.Threading.Tasks;

namespace Shared.Extensions.Tasks;

public static class TaskExtensions
{

    public static Task Then(this Task self, Action action)
    {
        return self.ContinueWith(t =>
        {
            t.GetAwaiter().GetResult();
            action();
        });
    }

    public static Task Then<T>(this Task<T> self, Action<T> action)
    {
        return self.ContinueWith(t =>
        {
            var result = t.GetAwaiter().GetResult();
            action(result);
        });
    }

    public static Task<R> Then<T, R>(this Task<T> self, Func<T, R> function)
    {
        return self.ContinueWith(t =>
        {
            var result = t.GetAwaiter().GetResult();
            return function(result);
        });
    }
}
