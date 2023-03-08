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
                // Check if user already exists
                var existingUser = context.Users.FirstOrDefault(u => u.id == user.id);
                if (existingUser != null)
                {
                    return Conflict("User already registered in the database.");
                }

                // Add user to database
                context.Users.Add(user);
                context.SaveChanges();
            }

            return CreatedAtRoute("user", new { id = user.id }, user);
        }
    }
}
