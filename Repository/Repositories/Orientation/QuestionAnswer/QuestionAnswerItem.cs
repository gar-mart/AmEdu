using System.Collections.Generic;

namespace Repository.Repositories.Orientation;

public class QuestionAnswerItem
{
    public int QuestionId { get; set; }
    public int AnswerId { get; set; }
}

public class UserAnswersItem
{
    public int UserId { get; set; }
    public List<QuestionAnswerItem> UserQuestionsAndAnswers { get; set; }
}
