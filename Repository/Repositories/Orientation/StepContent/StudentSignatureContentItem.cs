using System;

namespace Repository.Repositories.Orientation;

public class StudentSignatureContentItem
{
    public int SignatureContentId { get; set; }
    public int StudentId { get; set; }
    public string Signature { get; set; }
    public DateTime? SignDate { get; set; }
}
