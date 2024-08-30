namespace Shared.Buzz;

public class BuzzResponse<T> where T : IResponse
{
    public T Response { get; set; }
}

public abstract class IResponse
{
    public string Code { get; set; }
    public string Message { get; set; }
}
