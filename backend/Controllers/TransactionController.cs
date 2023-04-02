using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    [HttpPost("sendmoney/{fromUserId}/{toUserId}/{amount}")]
    public IActionResult TransferMoneyToOtherUser(int fromUserId, int toUserId, double amount)
    {
        var firstUser = backend.Models.User.GetUserById(fromUserId);

        if (firstUser == null)
        {
            return NotFound("First user was not found in the database");
        }

        var secondUser = backend.Models.User.GetUserById(toUserId);

        if (secondUser == null)
        {
            return NotFound("First user was not found in the database");
        }

        if (amount == 0)
        {
            return BadRequest("Amount money sent cannot be 0");
        }

        if (amount < 0)
        {
            return BadRequest("Amount money sent cannot negative");
        }

        using (var context = new Database())
        {
            var fromUser = context.Users.FirstOrDefault(u => u.Id == fromUserId);
            var toUser = context.Users.FirstOrDefault(u => u.Id == toUserId);

            if (fromUser == null || toUser == null)
            {
                return NotFound();
            }

            var fromUserAccount = context.Accounts.FirstOrDefault(a => a.UserId == fromUserId);
            var toUserAccount = context.Accounts.FirstOrDefault(a => a.UserId == toUserId);

            if (fromUserAccount == null || toUserAccount == null)
            {
                return BadRequest("Both users must have an account");
            }

            if (fromUserAccount.Balance < amount)
            {
                return BadRequest("Insufficient funds");
            }

            fromUserAccount.Balance -= amount;
            toUserAccount.Balance += amount;

            context.SaveChanges();

            return Ok();
        }
    }

    [HttpPost("sendmoney/{fromAccountId}/{toAccountId}/{amount}")]
    public IActionResult TransferMoneyToOtherAccount(int fromAccountId, int toAccountId, double amount)
    {
        using (var context = new Database())
        {
            var fromAccount = context.Accounts.FirstOrDefault(a => a.Id == fromAccountId);
            var toAccount = context.Accounts.FirstOrDefault(a => a.Id == toAccountId);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound();
            }

            if (fromAccount.Balance < amount)
            {
                return BadRequest("Insufficient funds");
            }

            fromAccount.Balance -= amount;
            toAccount.Balance += amount;

            context.SaveChanges();

            return Ok();
        }
    }
}
