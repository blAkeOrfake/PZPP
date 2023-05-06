using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Transaction>> GetAllTransactions()
    {
        return Transaction.GetAllTransactions();
    }

    [HttpGet("{userId}")]
    public ActionResult<List<Transaction>> GetUserTransactions(int userId)
    {
        if (backend.Models.User.GetUserById == null)
        {
            return NotFound("User of that id was not found");
        }

        return Transaction.GetUserTransactionsByUserId(userId);
    }

    [HttpPost("send")]
    public ActionResult<Transaction> SendTransaction([FromBody] Transaction transaction)
    {
        var firstUser = backend.Models.User.GetUserById(transaction.fromId);

        if (firstUser == null)
        {
            return NotFound("First user was not found in the database");
        }

        var secondUser = backend.Models.User.GetUserById(transaction.toId);

        if (secondUser == null)
        {
            return NotFound("First user was not found in the database");
        }

        if (transaction.Amount == 0)
        {
            return BadRequest("Amount money sent cannot be 0");
        }

        if (transaction.Amount < 0)
        {
            return BadRequest("Amount money sent cannot negative");
        }

        if ((Account.GetAccountBalanceById(transaction.fromId) - transaction.Amount) < 0)
        {
            return BadRequest("Insufficient funds in account.");
        }

        transaction.Date = DateTime.Now;

        return Transaction.MakeTransfer(transaction);
    }

    [HttpDelete("{transactionId}")]
    public ActionResult<Transaction> Delete(int id)
    {
        if (Transaction.GetTransactionById(id) == null)
        {
            return NotFound("Account not found.");
        }

        return Transaction.DeleteTransactionById(id);
    }

    [HttpPut("{transactionId}")]
    public ActionResult<Transaction> Update(int id, [FromBody] Transaction value)
    {
        if (Transaction.GetTransactionById(id) == null)
        {
            return NotFound("Account not found.");
        }

        return Transaction.UpdateTransactionById(id, value);
    }
}
