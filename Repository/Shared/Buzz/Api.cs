using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using Shared.Buzz.Responses;
using Shared.Extensions.Tasks;

namespace Shared.Buzz;

public class BuzzApi
{
    private readonly Stopwatch _tokenStopwatch = new();
    private readonly object _lock = new();
    private int _authenticationExpirationMinutes;
    private string _token;

    private bool NeedsLogin => string.IsNullOrEmpty(_token) || _tokenStopwatch.Elapsed.TotalMinutes >= _authenticationExpirationMinutes;

    #region Constructor
    private HttpClient Client { get; }
    private int DomainId { get; }
    private string Domain { get; }
    private string Username { get; }
    private string Password { get; }
    private string Endpoint { get; }
    public ApiType ApiType { get; }

    public BuzzApi(int domainId, string domain, string username, string password, string endpoint, ApiType apiType)
    {
        Client = new HttpClient(new HttpClientHandler { CookieContainer = new CookieContainer() })
        {
            Timeout = TimeSpan.FromMinutes(5)
        };
        Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        DomainId = domainId;
        Domain = domain;
        Username = username;
        Password = password;
        Endpoint = endpoint;
        ApiType = apiType;
    }
    #endregion

    #region API Gets                
    /// <summary><see href="https://dlap.gradpoint.com/docs/Command/GetStatus">https://dlap.gradpoint.com/docs/Command/GetStatus</see></summary>
    public Task<GetStatusResponse> GetStatus(string rating = null, int? ratingInt = null, bool? sms = null, bool? html = null)
    {
        if (!string.IsNullOrEmpty(rating) && ratingInt.HasValue)
        {
            throw new Exception("You can optionally supply rating or ratingInt, but not both.");
        }

        if (ratingInt.HasValue)
        {
            rating = ratingInt.ToString();
        }

        return Get<GetStatusResponse>(nameof(GetStatus), new { rating, sms, html }, requiresAuthentication: false);
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/Command/ListCourses">https://dlap.gradpoint.com/docs/Command/ListCourses</see></summary> 
    public Task<ListCoursesResponse> ListCourses(bool includeDescendantDomains = false, int? limit = 0, string show = "active", string select = "teachers", string text = null, string query = null, string subType = null, string subscriptionMode = null, string subscriptionDomainId = null)
    {
        return Get<ListCoursesResponse>(nameof(ListCourses), new { DomainId, includeDescendantDomains, limit, show, select, text, query, subType, subscriptionMode, subscriptionDomainId });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/Command/ListEnrollments">https://dlap.gradpoint.com/docs/Command/ListEnrollments</see></summary> 
    public Task<ListEnrollmentsResponse> ListEnrollments(bool includeDescendantDomains = false, int? limit = 0, string show = "current", string select = "user,metrics", string query = null, string userDomainId = null, string userQuery = null, string userText = null, string courseDomainId = null, string courseQuery = null, string courseText = null)
    {
        return Get<ListEnrollmentsResponse>(nameof(ListEnrollments), new { DomainId, includeDescendantDomains, limit, show, select, query, userDomainId, userQuery, userText, courseDomainId, courseQuery, courseText });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/ListUsers">https://dlap.gradpoint.com/docs/#!/Command/ListUsers</see></summary>
    public Task<ListUsersResponse> ListUsers(bool includeDescendantDomains = false, int? limit = 0, string show = "current", string select = "data", string text = null, string query = null)
    {
        return Get<ListUsersResponse>(nameof(ListUsers), new { DomainId, includeDescendantDomains, limit, show, select, text, query });
    }

    /// <summary><see href="https://api.agilixbuzz.com/docs/#!/Command/ListUserEnrollments">https://api.agilixbuzz.com/docs/#!/Command/ListUserEnrollments</see></summary> 
    public Task<ListEnrollmentsResponse> ListUserEnrollments(string userId, bool allStatus = true, string entityId = null, int? daysActivePastEnd = null, string query = null, string select = "course,metrics,course.teachers")
    {
        return Get<ListEnrollmentsResponse>(nameof(ListUserEnrollments), new { userId, allStatus, entityId, daysActivePastEnd, query, select });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/Command/GetResource">https://dlap.gradpoint.com/docs/Command/GetResource</see></summary>
    public async Task<byte[]> GetResource(string path, string entityId = null, string version = null, string packagetype = null, bool attachment = false, string @class = "MISC")
    {
        entityId ??= $"{DomainId}";
        var url = GetUrl(nameof(GetResource), true, new { path, entityId, version, packagetype, attachment, @class });
        using var response = await Client.GetStreamAsync(url);
        using var stream = new MemoryStream();
        await response.CopyToAsync(stream);
        return stream.ToArray();
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/Command/GetEnrollmentActivity">https://dlap.gradpoint.com/docs/Command/GetEnrollmentActivity</see></summary> 
    public Task<GetEnrollmentActivityResponse> GetEnrollmentActivity(string enrollmentId, bool? last = null, bool? mergeOverlap = true)
    {
        return Get<GetEnrollmentActivityResponse>(nameof(GetEnrollmentActivity), new { enrollmentId, last, mergeOverlap });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/GetAnnouncementList">https://dlap.gradpoint.com/docs/#!/Command/GetAnnouncementList</see></summary> 
    public Task<GetAnnouncementListResponse> GetAnnouncementList(string entityId, DateTime? modifiedDate = null)
    {
        return Get<GetAnnouncementListResponse>(nameof(GetAnnouncementList), new { entityId, modifiedDate });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/GetAnnouncement">https://dlap.gradpoint.com/docs/#!/Command/GetAnnouncement</see></summary> 
    public async Task<GetAnnouncementResponse> GetAnnouncement(string entityId, string path, string filePath = null, string packageType = "data", int? version = null)
    {
        var url = GetUrl(nameof(GetAnnouncement), true, new { entityId, path, filePath, packageType, version });
        var response = await Client.GetAsync(url);
        return await response.ToModel(typeof(GetAnnouncementResponse)) as GetAnnouncementResponse;
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/GetEntityWork2">https://dlap.gradpoint.com/docs/#!/Command/GetEntityWork2</see></summary> 
    public Task<GetEntityWork2Response> GetEntityWork2(string entityId, DateTime? date = null, bool outstanding = false, bool allStatus = true, string include = null)
    {
        return Get<GetEntityWork2Response>(nameof(GetEntityWork2), new { entityId, date, outstanding, allStatus, include });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/GetStudentSubmissionHistory">https://dlap.gradpoint.com/docs/#!/Command/GetStudentSubmissionHistory</see></summary> 
    public Task<GetStudentSubmissionHistoryResponse> GetStudentSubmissionHistory(string enrollmentId, string itemId)
    {
        return Get<GetStudentSubmissionHistoryResponse>(nameof(GetStudentSubmissionHistory), new { enrollmentId, itemId });
    }

    /// <summary><see href="https://dlap.gradpoint.com/docs/#!/Command/GetEntityWork2">https://dlap.gradpoint.com/docs/#!/Command/GetEntityWork2</see></summary> 
    /// <remarks>Querying by <c>/visibility='0'</c> will not work because Agilix does not store default values in the database.</remarks>
    public Task<GetItemListResponse> GetItemList(string entityId, string itemId = null, string query = "", bool allVersions = false)
    {
        return Get<GetItemListResponse>(nameof(GetItemList), new { entityId, itemId, query, allVersions });
    }
    #endregion

    #region API Posts
    /// <summary><see href="https://api.agilixbuzz.com/docs/Command/Login3">https://api.agilixbuzz.com/docs/Command/Login3</see></summary> 
    public Task<Login3Response> Login3(string token = null)
    {
        var request = new Login3Request(Domain, Username, Password, token);
        return Post<Login3Response, Login3Request>(request, requiresAuthentication: false)
            .Then(t =>
            {
                _tokenStopwatch.Restart();
                if (string.IsNullOrEmpty(t.User?.Token))
                {
                    throw new ApplicationException("Could not authenticate with Agilix: " + t.Message);
                }

                _token = t.User.Token;
                _authenticationExpirationMinutes = Math.Max(t.User.AuthenticationExpirationMinutes - 1, t.User.AuthenticationExpirationMinutes); // add a minute buffer just in case
                return t;
            });
    }
    #endregion

    #region Helpers
    private async Task<T> Get<T>(string cmd, object queryParameterModel = default, bool requiresAuthentication = true) where T : IResponse
    {
        do
        {
            var retries = 0;
            try
            {
                var url = GetUrl(cmd, requiresAuthentication, queryParameterModel);
                var response = await Client.GetAsync(url);
                return await response.ToModel<T>();
            }
            catch when (retries++ < 5)
            {
                await Task.Delay(retries * 1000);
            }
        } while (true);
    }

    private async Task<T> Post<T, R>(R request, bool requiresAuthentication = true) where T : IResponse where R : IRequest
    {
        do
        {
            var retries = 0;
            try
            {
                // not running any POSTs that require authentication yet. Will implement when/if necessary.

                var buzzRequest = new BuzzRequest<R>
                {
                    Request = request
                };

                var response = await Client.PostAsync(Endpoint, buzzRequest.ToHttpContent());
                return await response.ToModel<T>();
            }
            catch when (retries++ < 5)
            {
                await Task.Delay(retries * 1000);
            }
        } while (true);
    }

    private string GetUrl<T>(string cmd, bool requiresAuthentication, T queryParameterModel) where T : class
    {
        if (requiresAuthentication)
        {
            if (NeedsLogin)
            {
                lock (_lock)
                {
                    if (NeedsLogin)
                    {
                        Login3().Wait();
                    }
                }
            }
        }

        return $"{Endpoint}?cmd={cmd}{(requiresAuthentication ? $"&{nameof(_token)}={_token}" : string.Empty)}{queryParameterModel.ToQueryString(prependQuestionMark: false, prependAmpersand: true)}";
    }
    #endregion
}

public enum ApiType
{
    Connexus = 1,
    [Display(Name = "Licoln Learning")]
    LincolnLearning = 2,
    [Display(Name = "Flex Point")]
    FlexPoint = 3
}
