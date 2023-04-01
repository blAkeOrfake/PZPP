using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    [HttpGet(Name = "user")]
    public IEnumerable<User> Get()
    {
        return backend.Models.User.GetUsers();
    }

    [HttpPost("register")]
    public ActionResult<User> Register([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User data is null.");
        }

        if (user.Username == null)
        {
            return BadRequest("User's username is null.");
        }

        if (user.Password == null)
        {
            return BadRequest("User's password is null.");
        }

        if (backend.Models.User.GetUser(user) != null)
        {
            return Conflict("User already registered in the database");
        }

        backend.Models.User.AddUser(user);
        return CreatedAtRoute("user", new { id = user.Id }, user);
    }

    [HttpPost("login")]
    public ActionResult<User> Login([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User data is null.");
        }

        if (user.Username == null)
        {
            return BadRequest("User's username is null.");
        }

        if (user.Password == null)
        {
            return BadRequest("User's password is null.");
        }

        var userInDatabase = backend.Models.User.GetUser(user);

        if (userInDatabase == null)
        {
            return Unauthorized("Wrong username.");
        }

        if (userInDatabase.Password != user.Password)
        {
            return Unauthorized("Wrong user password");
        }

        return Ok("Login successful.");
    }
}
