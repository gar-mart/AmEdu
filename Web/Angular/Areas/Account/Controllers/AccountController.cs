using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using FD.Base.Shared.Helpers;
using FD.Base.Shared.Web.Filters;
using FD.Base.Shared.Web.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Repository.Infrastructure;
using Repository.Repositories.Security;
using Repository.Repositories.Security.Groups;
using Repository.Repositories.Security.Users;

using Web.Areas.Account.Hubs;
using Web.Areas.Account.Models;
using Web.Helpers;

using CommonUserRepository = Repository.Repositories.Common.User.UserRepository;

namespace Web.Areas.Account.Controllers;

[Area("Account")]
[Route("api/[area]/[controller]/[action]")]
public sealed class AccountController: ApiController
{
    private readonly ILogger<AccountController> _logger;
    private readonly AppConfigurations _appConfigurations;
    private readonly SignInManager<ApplicationIdentityUser> _signInManager;
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IViewRenderService _viewRenderService;
    private readonly GroupRepository _groupRepository;
    private readonly UserRepository _userRepository;
    private readonly CommonUserRepository _commonUserRepository;
    private readonly IHubContext<AccountHub, IAccountHub> _accountHubContext;
    private readonly RazorHelper _razorHelper;

    public AccountController(
        ILogger<AccountController> logger,
        IOptions<AppConfigurations> appConfigurations,
        SignInManager<ApplicationIdentityUser> signInManager,
        UserManager<ApplicationIdentityUser> userManager,
        IViewRenderService viewRenderService,
        GroupRepository groupRepository,
        UserRepository userRepository,
        CommonUserRepository commonUserRepository,
        IHubContext<AccountHub, IAccountHub> accountHubContext,
        IRazorHelper<ApplicationIdentityUser> razorHelper)
    {
        _logger = logger;
        _appConfigurations = appConfigurations.Value;
        _signInManager = signInManager;
        _userManager = userManager;
        _viewRenderService = viewRenderService;
        _groupRepository = groupRepository;
        _userRepository = userRepository;
        _commonUserRepository = commonUserRepository;
        _accountHubContext = accountHubContext;
        _razorHelper = (RazorHelper)razorHelper;
    }

    [HttpPost]
    public new async Task<IActionResult> SignOut()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    #region Registration
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegistrationInput input)
    {
        if (!ModelState.IsValid)
        {
            return InvalidModelState();
        }

        if (!input.EmailAddress.EndsWith("@freedomdev.com", StringComparison.InvariantCultureIgnoreCase))
        {
            return BadRequest("Sorry, we are only allowing users with an @freedomdev.com domain to register at this time.");
        }

        if (User.Identity.IsAuthenticated)
        {
            await _signInManager.SignOutAsync();
        }

        var user = new ApplicationIdentityUser
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            UserName = input.EmailAddress,
            Email = input.EmailAddress
        };

        var createResult = await CreateUser(user, input.Password);

        if (createResult.Succeeded)
        {
            user = await _userManager.FindByEmailAsync(input.EmailAddress);
            await SendConfirmEmail(user);
            return Ok(await GetUser(user));
        }

        return BadRequest(createResult.Errors.Select(e => e.Description).LastOrDefault()); // using last or default because identity will first check the username then the email, and currently we want the message regarding email
    }

    [HttpPost]
    public async Task<IActionResult> ConfirmEmail(string emailAddress, string code)
    {
        var user = await _userManager.FindByEmailAsync(emailAddress);

        if (user != null)
        {
            var confirmResult = await _userManager.ConfirmEmailAsync(user, code);
            if (confirmResult.Succeeded)
            {
                if (!User.Identity.IsAuthenticated)
                {
                    await _signInManager.SignInAsync(user, isPersistent: true);
                }
                return Ok(await GetUser(user));
            }
        }

        return BadRequest("Invalid Code");
    }

    [HttpPost, Authorize]
    public async Task<IActionResult> ResendConfirmEmail()
    {
        var user = await _userManager.GetUserAsync(User);
        await SendConfirmEmail(user);
        return Ok();
    }

    private async Task SendConfirmEmail(ApplicationIdentityUser user)
    {
        var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var viewModel = new ConfirmEmailViewModel(user, emailCode);
        var html = await _viewRenderService.RenderToStringAsync("ConfirmEmail", viewModel);

        throw new NotImplementedException(nameof(SendConfirmEmail));
        // undone: not implemented
        //await _emailSenderService.SendEmailAsync(user.Email, "Confirm Email", html);
    }

    private async Task<IdentityResult> CreateUser(ApplicationIdentityUser user, string password = null, params string[] groupNames)
    {
        var result = password == null ? await _userManager.CreateAsync(user) : await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            // always assign to everyone and include any groups that were passed in as well
            var groups = new HashSet<string>(groupNames.Append("Everyone"));
            var assignGroups = (await _groupRepository.GetListAsync())
                .Where(g => groups.Contains(g.Name))
                .Select(g => g.Id)
                .Distinct();

            _ = await _groupRepository.SetUserGroupsAsync(user.UserId, assignGroups);
        }

        return result;
    }
    #endregion

    #region Get User
    [HttpGet, Authorize]
    public async Task<IActionResult> Me()
    {
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            await _signInManager.SignOutAsync();
            return BadRequest("Invalid User.");
        }
        else
        {
            await _signInManager.RefreshSignInAsync(user); // We should keep the user principal up-to-date with the client
            return Ok(await GetUser(user));
        }
    }

    private async Task<IUserDto> GetUser(string userName = null)
    {
        var user = userName == null ? await _userManager.GetUserAsync(User) : await _userManager.FindByNameAsync(userName);
        return await GetUser(user);
    }

    private async Task<IUserDto> GetUser(ApplicationIdentityUser user)
    {
        var (roles, commonUser) = await (
            _groupRepository.GetEffectiveRolesForUserAsync(user.UserId),
            _commonUserRepository.ReturnUserByUserName(user.Email));

        user.Roles = roles;
        user.CounselorAssignments = commonUser.CounselorAssignments;

        return user;
    }
    #endregion

    #region Sign In
    [HttpPost, InvalidModelStateFilter(Bypass = true)]
    public async Task<IActionResult> SignIn([FromBody] SignInInput input)
    {
        #region Developer Backdoor
#if DEBUG
        if (input.Backdoor && Debugger.IsAttached)
        {
            // protect the Developer Backdoor by ensuring the DEBUG compile time constant exists, as well as a Debugger being attached
            const string backdoorEmail = "admin@freedomdev.com";
            var user = await _userManager.FindByEmailAsync(backdoorEmail);

            if (user == null)
            {
                await CreateUser(new ApplicationIdentityUser
                {
                    FirstName = "Admin",
                    LastName = "FreedomDev",
                    UserName = backdoorEmail,
                    Email = backdoorEmail,
                    EmailConfirmed = true
                }, null, "Admin");
                user = await _userManager.FindByEmailAsync(backdoorEmail);
            }

            await _signInManager.SignInAsync(user, isPersistent: true);
            return Ok(await GetUser(user));
        }
#endif
        #endregion

        if (!ModelState.IsValid)
        {
            return InvalidModelState();
        }

        if (User.Identity.IsAuthenticated)
        {
            // user is already signed in, just return current user.
            return Ok(await GetUser());
        }

        var result = await _signInManager.PasswordSignInAsync(input.Username, input.Password, isPersistent: input.RememberMe, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            return Ok(await GetUser(input.Username));
        }
        else if (result.IsLockedOut)
        {
            return BadRequest("Your account is locked out.");
        }
        else if (result.IsNotAllowed)
        {
            return BadRequest("You're not allowed to sign in.");
        }
        else if (result.RequiresTwoFactor)
        {
            return BadRequest("Two factor authentication is required.");
        }

        return BadRequest("Invalid Username or Password");
    }

    /// <summary>
    /// Initiated by client to challenge external provider for sign in.
    /// </summary>
    /// <param name="provider">Values like "Google" or "Microsoft".</param>
    /// <returns>Challenge result</returns>
    [HttpPost]
    public IActionResult SignInWithProvider([FromForm] ExternalSignInInput input)
    {
        var redirectUrl = Url.Action(nameof(HandleExternalSignIn));
        var authenticationProperties = _signInManager.ConfigureExternalAuthenticationProperties(input.Provider, redirectUrl);
        return Challenge(authenticationProperties, input.Provider);
    }

    [HttpGet]
    public async Task<IActionResult> HandleExternalSignIn()
    {
        try
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: true);

            if (!result.Succeeded)
            {
                // users are created before signing in for the first time
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);

                if (user != null)
                {
                    if (!user.EmailConfirmed)
                    {
                        // The user exists but their email hasn't been confirmed yet.
                        // By signing in with an external provider, we can safely say that this user owns this account and set EmailConfirmed to true.
                        user.EmailConfirmed = true;
                        _ = await _userManager.UpdateAsync(user);
                    }

                    _ = await _userManager.AddLoginAsync(user, info);
                    await _signInManager.SignInAsync(user, isPersistent: true);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "HandleExternalSignIn");
        }

        // redirect to Angular route to finalize external sign in flow
        return LocalRedirect("/auth-callback");
    }
    #endregion

    #region Forgot Password
    [HttpPost]
    public async Task<IActionResult> ForgotPassword(string emailAddress)
    {
        var user = await _userManager.FindByEmailAsync(emailAddress);

        if (user != null)
        {
            var forgotPasswordCode = await _userManager.GeneratePasswordResetTokenAsync(user);
            var viewModel = new ForgotPasswordEmailViewModel(user, forgotPasswordCode);
            var html = await _viewRenderService.RenderToStringAsync("ForgotPasswordEmail", viewModel);

            throw new NotImplementedException(nameof(ForgotPassword));
            // undone: not implemented
            //await _emailSenderService.SendEmailAsync(user.Email, "Forgot Password", html);
        }

        // don't indicate to the user whether or not this email address is valid for security purposes
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordInput input)
    {
        if (!ModelState.IsValid)
        {
            return InvalidModelState();
        }

        var user = await _userManager.FindByEmailAsync(input.EmailAddress);

        if (user != null)
        {
            var result = await _userManager.ResetPasswordAsync(user, input.Code, input.Password);
            if (result.Succeeded)
            {
                // This is implicit as they had to click a email link to get here.
                if (!user.EmailConfirmed)
                {
                    user.EmailConfirmed = true;
                    _ = await _userManager.UpdateAsync(user);
                }

                return Ok();
            }

            if (result.Errors.Any(s => s.Code == "InvalidToken"))
            {
                return BadRequest("Your reset token has expired, please reset your password.");
            }

            // log the errors in case there was a server error and not an issue with the code the client provided for security purposes.
            _logger.LogWarning($"ResetPassword: {result.Errors.Select(e => e.Description).Aggregate((errors, error) => $"{errors}, {error}")}");
        }

        return BadRequest("We couldn't reset your password.");
    }
    #endregion


    #region Update Profile
    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileDto input)
    {
        if (UserContext.Id != input.Id)
        {
            return Unauthorized();
        }

        if (input.CurrentPassword != null)
        {
            if (!await _userManager.CheckPasswordAsync(UserContext, input.CurrentPassword))
            {
                ModelState.AddModelError("CurrentPassword", "Current password does not match.");
                return BadRequest("Current password does not match.");
            }
        }
        else if (input.NewPassword != null)
        {
            ModelState.AddModelError("CurrentPassword", "Current password is required.");
            return BadRequest("Current password is required.");
        }

        if (ModelState.IsValid)
        {

            // Update Profile Fields
            _ = await _userRepository.UpdateAsync(UserContext, input);

            // Update Password
            if (input.CurrentPassword != null && input.NewPassword != null)
            {
                var identityUser = await _userManager.FindByIdAsync(await _userManager.GetUserIdAsync(UserContext));
                _ = await _userManager.ChangePasswordAsync(identityUser, input.CurrentPassword, input.NewPassword);
            }

            await AccountHub.RefreshUsersAsync(_accountHubContext, input.UserId);
        }

        return Ok();
    }
    #endregion
}
