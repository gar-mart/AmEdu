
using System.Collections.Generic;

namespace Repository.Repositories.Orientation;

public class QuizContentItem: ContentModel
{
    public List<QuestionModel> Questions { get; set; }
}
