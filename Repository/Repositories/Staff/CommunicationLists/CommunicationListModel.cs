using System.Collections.Generic;

namespace Repository.Repositories.Staff;

public class CommunicationListModel: CommunicationListItem
{
    public List<CommunicationListEntryModel> Entries { get; set; } = new List<CommunicationListEntryModel>();
}
