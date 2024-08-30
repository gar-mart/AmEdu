using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class GetItemListResponse: IResponse
{
    public GetItemListResponseItems Items { get; set; }

    public class GetItemListResponseItems
    {
        public Item[] Item { get; set; }
    }
}
