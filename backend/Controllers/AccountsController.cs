using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Account> Get()
        {
            using (var context = new Database())
            {
                return context.Accounts.ToList();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Account> Get(int id)
        {
            using (var context = new Database())
            {
                Account? account = context.Accounts.FirstOrDefault(a => a.Id == id);
                return account;
            }
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Account> Post([FromBody]Account account)
        {
            if (account == null)
            {
                return BadRequest("Account data is null.");
            }
            using (var context = new Database())
            {
                var existingAccount = context.Accounts.FirstOrDefault(a => a.Id == account.Id);
                if (existingAccount != null)
                {
                    return Conflict("Account already in the database.");
                }

                context.Accounts.Add(account);
                context.SaveChanges();

                return Ok("Saved successfully");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult<Account> Put(int id, [FromBody]Account value)
        {
            using (var context = new Database()) {
                var account = context.Accounts.FirstOrDefault(a => a.Id == value.Id);
                account = value;
                context.Accounts.Update(account);
                context.SaveChanges();

                return Ok("Update successfull");
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult<Account> Delete(int id)
        {
            using (var context = new Database())
            {
                var account = context.Accounts.FirstOrDefault(a => a.Id == id);

                if (account is null) {
                    return BadRequest("Account not found");
                }
                context.Accounts.Remove(account);
                context.SaveChanges();

                return Ok("Delete success");
            }
        }
    }
}

