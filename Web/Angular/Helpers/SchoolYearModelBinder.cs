//using Microsoft.AspNetCore.Mvc.ModelBinding;
//using System.Threading.Tasks;
//using System;
//using Shared.Helpers;

//namespace Api.Helpers
//{
//    public class SchoolYearBinder : DefaultModelBinder
//    {
//        public Task BindModelAsync(ModelBindingContext bindingContext)
//        {
//            if (bindingContext == null)
//            {
//                throw new ArgumentNullException(nameof(bindingContext));
//            }

//            SchoolYear schoolYear = default;
//            bindingContext.valuese


//            int? userId = null;

//            // find user and the claims
//            var user = bindingContext.ActionContext.HttpContext.User;
//            var claims = user.Claims;
//            var idClaim = claims.SingleOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

//            // find claim and read value
//            if (idClaim != null)
//            {
//                if (int.TryParse(idClaim.Value, out int claimIdValue)
//                {
//                    userId = claimIdValue;
//                }
//            }

//            // create object if id is valid
//            if (userId.HasValue)
//            {
//                schoolYear = PortalUserId.Create(userId.Value);
//            }

//            // if user id was found, the filled object is passed
//            //      if userId was not found, null will be passed to the actions
//            bindingContext.Result = ModelBindingResult.Success(schoolYear);
//            return Task.CompletedTask;
//        }
//    }

//}
