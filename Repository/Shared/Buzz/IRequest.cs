namespace Shared.Buzz;

public class BuzzRequest<T> where T : IRequest
{
    public T Request { get; set; }
}

public abstract class IRequest
{
    public abstract string Cmd { get; }
}
