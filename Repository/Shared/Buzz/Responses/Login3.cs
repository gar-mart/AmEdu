namespace Shared.Buzz.Responses;

public class Login3Request: IRequest
{
    public Login3Request(string domain, string username, string password, string token)
    {
        Username = $"{domain}/{username}";
        Password = password;

        if (!string.IsNullOrEmpty(token))
        {
            Token = new Login3Token { Token = token };
        }
    }

    public override string Cmd => "login3";
    public string Username { get; set; }
    public string Password { get; set; }
    public Login3Token Token { get; set; }

    public class Login3Token
    {
        public string Token { get; set; }
    }
}

public class Login3Response: IResponse
{
    public Login3User User { get; set; }

    public class Login3User
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DomainId { get; set; }
        public string DomainName { get; set; }
        public string Userspace { get; set; }
        public string Token { get; set; }
        public int AuthenticationExpirationMinutes { get; set; }
    }
}
