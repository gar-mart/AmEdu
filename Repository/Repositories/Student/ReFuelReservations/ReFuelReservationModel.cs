using System;

using Repository.Repositories.Common.Student;

namespace Repository.Repositories.Student;

public class ReFuelReservationModel: ReFuelReservationItem
{
    public StudentItem Student { get; set; }
    public DateTime? LastCheckIn { get; set; }
    public DateTime? LastCheckOut { get; set; }
}
