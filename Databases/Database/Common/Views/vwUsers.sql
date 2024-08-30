CREATE VIEW Common.vwUsers
AS
SELECT 
	u.Id                                   
	, u.GoogleId                          
	, u.Email                              
	, u.FirstName                          
	, u.LastName                           
	, u.Name           
	, u.MentorId                           
	, u.IsActive                           
	, u.GradeLevel                         
	, u.OrientationStartTime               
	, u.OrientationExpiredNotificationSent 
	, u.OrientationFinishTime              
	, u.AppointmentLink                       
	, u.ProfilePicture                     
	, u.SecondaryMentorId                  
	, u.EnrollmentDate                     
	, u.UnenrollmentDate                   
	, u.ConnexusId                         
	, u.LastConnexusSync                   
	, u.LincolnLearningId                  
	, u.LastLincolnLearningSync            
	, u.FlexPointId                  
	, u.LastFlexPointSync            
	, u.Accomodations                      
	, u.HasAccomodations                   
	, u.UICNumber                          
	, u.IdentityId 
	, u.UserName 
	, u.NormalizedUserName 
	, u.NormalizedEmail 
	, u.EmailConfirmed 
	, u.PasswordHash 
	, u.SecurityStamp 
	, u.ConcurrencyStamp 
	, u.PhoneNumber 
	, u.PhoneNumberConfirmed 
	, u.TwoFactorEnabled 
	, u.LockoutEnd 
	, u.LockoutEnabled 
	, u.AccessFailedCount 
	, u.TenantId 
	, u.UserId 
	, u.SliceId 
	, u.IsTriage 
	, u.CreatedUserId 
	, u.CreatedDate 
	, u.UpdatedUserId 
	, u.UpdatedDate 
	, u.FullName 
	, u.IsStaff
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT UserId FROM Security.vwUserRoles ur WHERE ur.RoleName IN ('ReFuel Coordinator') AND ur.UserId = u.UserId), 1, 0) IsReFuelCoordinator
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT UserId FROM Security.vwUserRoles ur WHERE ur.RoleName IN ('Admin') AND ur.UserId = u.UserId), 1, 0) IsAdmin
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT UserId FROM Security.vwUserRoles ur WHERE ur.RoleName IN ('Interventionist') AND ur.UserId = u.UserId), 1, 0) IsInterventionist
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT UserId FROM Security.vwUserRoles ur WHERE ur.RoleName IN ('Teacher') AND ur.UserId = u.UserId), 1, 0) IsTeacher
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT * FROM Common.Users s WHERE s.MentorId = u.Id AND s.IsActive = 1), 1, 0) IsMentor
	, IIF(u.IsStaff = 1 AND EXISTS (SELECT * FROM Common.Users s WHERE s.SecondaryMentorId = u.Id AND s.IsActive = 1), 1, 0) IsSecondaryMentor
FROM (
	SELECT 
		  u.Id                                   
		, u.GoogleId                          
		, u.Email                              
		, u.FirstName                          
		, u.LastName                           
		, u.Name            
		, u.MentorId                           
		, u.IsActive                           
		, u.GradeLevel                         
		, u.OrientationStartTime               
		, u.OrientationExpiredNotificationSent 
		, u.OrientationFinishTime              
		, u.AppointmentLink                       
		, u.ProfilePicture                     
		, u.SecondaryMentorId                  
		, u.EnrollmentDate                     
		, u.UnenrollmentDate                   
		, u.ConnexusId                         
		, u.LastConnexusSync                   
		, u.LincolnLearningId                  
		, u.LastLincolnLearningSync       
		, u.FlexPointId
		, u.LastFlexPointSync
		, u.Accomodations                      
		, u.HasAccomodations                   
		, u.UICNumber                          
		, u.IdentityId 
		, u.UserName 
		, u.NormalizedUserName 
		, u.NormalizedEmail 
		, u.EmailConfirmed 
		, u.PasswordHash 
		, u.SecurityStamp 
		, u.ConcurrencyStamp 
		, u.PhoneNumber 
		, u.PhoneNumberConfirmed 
		, u.TwoFactorEnabled 
		, u.LockoutEnd 
		, u.LockoutEnabled 
		, u.AccessFailedCount 
		, u.TenantId 
		, u.UserId 
		, u.SliceId 
		, u.IsTriage 
		, u.CreatedUserId 
		, u.CreatedDate 
		, u.UpdatedUserId 
		, u.UpdatedDate 
		, u.FullName 
		, IIF(EXISTS (SELECT UserId FROM Security.vwUserRoles ur WHERE ur.RoleName IN ('Staff') AND ur.UserId = u.UserId), 1, 0) IsStaff
	FROM Common.Users u
) u