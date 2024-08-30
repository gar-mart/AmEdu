using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

using FD.Base.Shared.Models;
using FD.Base.Shared.Repository.Infrastructure.Helpers;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Common.Student;

using Shared.Extensions.Tasks;

namespace Repository.Repositories.Student;

public class ReFuelReservationRepository: BaseAppRepository<ReFuelReservationItem>
{
    public ReFuelReservationRepository(
        IOptions<AppConfigurations> appConfigurations,
        ILogger<ReFuelReservationRepository> logger
        ) : base(appConfigurations, logger) { }

    public Task<IEnumerable<ReFuelReservationModel>> GetListAsync(DateTime week)
    {
        return CommandBuilder
            .GetListBuilder()
            .AddModel(new { week })
            .QueryMultipleAsync<ReFuelReservationModel, StudentItem>()
            .Then(query => query.SingleJoin(r => r.StudentId, s => s.Id, (r, s) => r.Student = s));
    }

    public Task<IEnumerable<ReFuelReservationPromotionModel>> UpdateWithPromotionsAsync(IUserContext userContext, ReFuelReservationItem item)
    {
        return CommandBuilder
            .UpdateBuilder(userContext)
            .AddModel(item)
            .QueryListAsync<ReFuelReservationPromotionModel>();
    }

    public Task<(ReFuelReservationModel, ReFuelEligibilityModel)> GetByIdAsync(int studentId, DateTime date)
    {
        return CommandBuilder
            .GetByIdBuilder()
            .AddModel(new { studentId, date })
            .QueryMultipleAsync<ReFuelReservationModel, ReFuelEligibilityModel>()
            .Then(result => (result.Item1.SingleOrDefault(), result.Item2.SingleOrDefault()));
    }

    public Task<(bool OpenSpot, bool StandbyPosition)> ReserveAsync(IUserContext userContext, DateTime date, ReFuelReservationType type, string generalInquiryResponse, string breakfastInquiryResponse, string lunchInquiryResponse)
    {
        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Student.ReserveReFuelReservation")
            .AddModel(new
            {
                date,
                type,
                generalInquiryResponse,
                breakfastInquiryResponse,
                lunchInquiryResponse
            })
            .AddOutput("openSpot", DbType.Boolean)
            .AddOutput("standbyPosition", DbType.Boolean)
            .CoreExecuteAsync()
            .Then(result => (result.Get<bool>("openSpot"), result.Get<bool>("standbyPosition")));
    }

    public Task<IEnumerable<ReFuelReservationPromotionModel>> CancelAsync(IUserContext userContext, DateTime date)
    {
        return CommandBuilder
            .GenericBuilder(userContext)
            .ForStoredProcedure("Student.CancelReFuelReservation")
            .AddModel(new { date })
            .QueryListAsync<ReFuelReservationPromotionModel>();
    }
}
