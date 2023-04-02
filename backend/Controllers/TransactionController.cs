using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<List<Transaction>> GetUserTransactions(int id)
    {
        if (backend.Models.User.GetUserById == null)
        {
            return NotFound("User of that id was not found");
        }

        return Transaction.GetUserTransactionsByUserId(id);
    }

    [HttpPost("sendmoney/{fromUserId}/{toUserId}/{amount}")]
    public ActionResult<Transaction> TransferMoneyToOtherUser(int fromUserId, int toUserId, double amount, TransactionCategory category)
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

        if ((Account.GetAccountBalanceById(fromUserId) - amount) < 0)
        {
            return BadRequest("Insufficient funds in account.");
        }

       return Transaction.MakeTransfer(
            fromUserId,
            toUserId,
            amount,
            TransactionType.EXTERNAL,
            category
        );
    }

    [HttpPost("sendmoney/{fromAccountId}/{toAccountId}/{amount}")]
    public ActionResult<Transaction> TransferMoneyToOtherAccount(int fromAccountId, int toAccountId, double amount)
    {
        var firstAccount = Account.GetAccountById(fromAccountId);

        if (firstAccount == null)
        {
            return NotFound("First account was not found in the database");
        }

        var secondAccount = Account.GetAccountById(toAccountId);

        if (secondAccount == null)
        {
            return NotFound("Secnod accunt was not found in the database");
        }

        if (amount == 0)
        {
            return BadRequest("Amount money sent cannot be 0");
        }

        if (amount < 0)
        {
            return BadRequest("Amount money sent cannot negative");
        }

        if ((Account.GetAccountBalanceById(fromAccountId) - amount) < 0)
        {
            return BadRequest("Insufficient funds in account.");
        }

        return Transaction.MakeTransfer(
             fromAccountId,
             toAccountId,
             amount,
             TransactionType.INTERNAL,
             null
         );
    }

    [HttpDelete("{id}")]
    public ActionResult<Transaction> Delete(int id)
    {
        if(Transaction.GetTransactionById(id) == null)
        {
            return NotFound("Account not found.");
        }

        return Transaction.DeleteTransactionById(id);
    }

    [HttpPut("{id}")]
    public ActionResult<Transaction> Update(int id, [FromBody] Transaction value)
    {
        if (Transaction.GetTransactionById(id) == null)
        {
            return NotFound("Account not found.");
        }

        return Transaction.UpdateTransactionById(id, value);
    }
}
