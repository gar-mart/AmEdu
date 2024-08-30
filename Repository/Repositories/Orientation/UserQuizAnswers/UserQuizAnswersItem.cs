using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Repository.Repositories.Orientation;

public class UserQuizAnswersItem
{
    public List<QuestionItem> Questions { get; set; }
    public List<AnswerItem> Answers { get; set; }
}

public class AnswerItem
{
    [Key]
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string AnswerText { get; set; }
    public bool IsCorrectAnswer { get; set; }
    public bool IsUserAnswer { get; set; }
    public int OrderBy { get; set; }
}

public class QuestionItem
{
    [Key]
    public int Id { get; set; }
    public int OrderBy { get; set; }
    public string QuestionText { get; set; }
    public int QuizContentId { get; set; }
}

public class QuestionModel: QuestionItem
{
    public List<AnswerItem> Answers { get; set; } = new List<AnswerItem>();
}
