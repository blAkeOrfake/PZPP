using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        [HttpGet(Name = "user")]
        public IEnumerable<User> Get()
        {
            using (var context = new Database())
            {
                return context.Users.ToList();
            }
        }

        [HttpPost("register")]
        public ActionResult<User> Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is null.");
            }

            using (var context = new Database())
            {
                var existingUser = context.Users.FirstOrDefault(u => u.id == user.id);
                if (existingUser != null)
                {
                    return Conflict("User already registered in the database.");
                }

                context.Users.Add(user);
                context.SaveChanges();
            }

            return CreatedAtRoute("user", new { id = user.id }, user);
        }

        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] User user)
        {
            if (user.password == null || user.username == null || user == null)
            {
                return BadRequest("User data is null.");
            }


            using (var context = new Database())
            {
                var checkUser = context.Users.FirstOrDefault(u => u.username == user.username);

                if (checkUser == null)
                {
                    return Unauthorized("Wrong username.");
                }

                if (checkUser.password != user.password)
                {
                    return Unauthorized("Wrong user password");
                }

                return Ok("Login successful.");
            }
        }
    }
}
