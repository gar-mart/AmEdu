using Shared.Buzz.Schemas;

namespace Shared.Buzz.Responses;

public class ListUsersResponse: IResponse
{
    public ListUsers Users { get; set; }

    public class ListUsers
    {
        public BuzzUser[] User { get; set; }
    }
}
