namespace Repository.Repositories.Attendance;
public class InterventionWithLevelsDto
{
    public int StudentId { get; set; }
    public string Student { get; set; }
    public string GradeLevel { get; set; }
    public string Mentor { get; set; }

    public InterventionLevel? Level1 { get; set; }
    public InterventionLevel? Level2 { get; set; }
    public InterventionLevel? Level3 { get; set; }
    public InterventionLevel? Level4 { get; set; }

    public bool? Level1EmailExists { get; set; }
    public bool? Level2EmailExists { get; set; }
    public bool? Level3EmailExists { get; set; }
    public bool? Level4EmailExists { get; set; }
}
