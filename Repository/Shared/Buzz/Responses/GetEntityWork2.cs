using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class GetEntityWork2Response: IResponse
{
    public GetEntityWork2ResponseWorks Works { get; set; }

    public class GetEntityWork2ResponseWorks
    {
        public Work[] Work { get; set; }
    }
}
