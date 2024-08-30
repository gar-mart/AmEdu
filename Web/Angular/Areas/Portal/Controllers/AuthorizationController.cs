using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Repository.Repositories.Common.User;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers;

public class AuthorizationController: ApiControllerBase
{
    private readonly UserRepository _userRepository;

    public AuthorizationController(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> ReturnUserByUserName(string username)
    {
        var user = await _userRepository.ReturnUserByUserName(username);
        return Ok(user);
    }
}
