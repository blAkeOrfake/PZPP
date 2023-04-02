using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    [HttpGet]
    public IEnumerable<User> Get()
    {
        return backend.Models.User.GetUsers();
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var user = backend.Models.User.GetUserById(id);
        if (user == null)
        {
            return BadRequest("User not found by that id.");
        }

        return user;
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

    [HttpPut("{id}")]
    public ActionResult<User> Put(int id, [FromBody] User value)
    {
        if (backend.Models.User.GetUserById(id) == null)
        {
            return NotFound("User of that id was not found.");
        }

        return backend.Models.User.UpdateUserById(id, value);
    }

    [HttpDelete("{id}")]
    public ActionResult<User> Delete(int id)
    {
        if (backend.Models.User.GetUserById(id) == null)
        {
            return NotFound("User of that id was not found.");
        }

        return backend.Models.User.DeleteUserById(id);
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

        return userInDatabase;
    }
}
