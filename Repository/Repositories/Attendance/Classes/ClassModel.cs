using System;
using System.Collections.Generic;

using Repository.Repositories.Attendance.ClassUsers;

using Shared.Buzz;

namespace Repository.Repositories.Attendance.Classes;

public class ClassModel: ClassItem
{
    public List<ClassUserModel> ClassUsers { get; set; } = new List<ClassUserModel>();

    public string BuzzId(ApiType apiType)
    {
        return apiType switch
        {
            ApiType.Connexus => ConnexusId.ToString(),
            ApiType.LincolnLearning => LincolnLearningId.ToString(),
            ApiType.FlexPoint => FlexPointId.ToString(),
            _ => throw new NotImplementedException(apiType.ToString())
        };
    }
}
