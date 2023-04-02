using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
public class AccountsController : Controller
{
    // GET: api/values
    [HttpGet]
    public IEnumerable<Account> Get()
    {
        return Account.GetAccounts();
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public ActionResult<Account> Get(int id)
    {
        var account = Account.GetAccountById(id);

        if (account == null)
        {
            return BadRequest("Account data is null.");
        }
        else
        {
            return account;
        }
    }

    [HttpGet("user/{userId}")]
    public ActionResult<List<Account>> GetUserAccounts(int userId)
    {
        var accounts = Account.GetUserAccountsByUserId(userId);

        if (accounts == null)
        {
            return BadRequest("Accounts were not found");
        }

        if (accounts.Count == 0)
        {
            return BadRequest("User does not have any accounts");
        }

        return accounts;
    }

    // POST api/values
    [HttpPost]
    public ActionResult<Account> Post([FromBody] Account account)
    {
        if (account == null)
        {
            return BadRequest("Account data is null.");
        }

        var existingAccount = Account.GetAccount(account);

        if (existingAccount != null)
        {
            return Conflict("Account already in the database.");
        }

        Account.AddAccount(account);

        return Ok();
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public ActionResult<Account> Put(int id, [FromBody] Account value)
    {
        if (Account.GetAccountById(id) == null)
        {
            return BadRequest("Account of this id does not exist.");
        }

        Account.UpdateAccoutById(id, value);
        return Ok();
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public ActionResult<Account> Delete(int id)
    {
        if (Account.GetAccountById(id) == null)
        {
            return BadRequest("Account of this id does not exist.");
        }

        Account.DeleteAccountById(id);
        return Ok();
    }
}
