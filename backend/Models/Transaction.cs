using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Models;

public class Transaction
{
    public Transaction() { }

    public Transaction(
        int? id,
        TransactionType type,
        TransactionCategory? category,
        int fromId,
        int toId,
        double amount
    )
    {
        this.Id = id;
        this.Type = type;
        this.Category = category;
        this.fromId = fromId;
        this.toId = toId;
        this.Amount = amount;
    }

    public int? Id { get; set; }
    public TransactionType Type { get; set; }
    public TransactionCategory? Category { get; set; }
    public int fromId { get; set; }
    public int toId { get; set; }
    public double Amount { get; set; }

    public static List<Transaction> GetAllTransactions()
    {
        using (var context = new Database())
        {
            return context.Transactions.ToList();
        }
    }

    public static List<Transaction> GetUserTransactionsByUserId(int id)
    {
        using (var context = new Database())
        {
            var accounts = Account.GetUserAccountsByUserId(id);

            return GetAllTransactions().Where(t => t.fromId == id || t.toId == id).ToList();
        }
    }

    public static Transaction? GetTransactionById(int id)
    {
        using (var context = new Database())
        {
            return context.Transactions.FirstOrDefault(t => t.Id == id);
        }
    }

    public static ActionResult<Transaction> MakeTransfer(Transaction transaction)
    {
        using (var context = new Database())
        {
            if (transaction.Type == TransactionType.EXTERNAL)
            {
                var secondAccount = Account.GetGeneralAccountByUserId(transaction.toId);
                secondAccount.Balance += transaction.Amount;
                Account.UpdateAccount(secondAccount);

                var firstAccount = Account.GetGeneralAccountByUserId(transaction.fromId);
                firstAccount.Balance -= transaction.Amount;
                Account.UpdateAccount(firstAccount);
            }
            else
            {
                var firstAccount = Account.GetAccountById(transaction.fromId);
                firstAccount.Balance -= transaction.Amount;
                Account.UpdateAccount(firstAccount);

                var secondAccount = Account.GetAccountById(transaction.toId);
                secondAccount.Balance += transaction.Amount;
                Account.UpdateAccount(secondAccount);
            }

            AddTransaction(transaction);

            return transaction;
        }
    }

    private static void AddTransaction(Transaction transaction)
    {
        using (var context = new Database())
        {
            context.Transactions.Add(transaction);
            context.SaveChanges();
        }
    }

    public static ActionResult<Transaction> UpdateTransactionById(int id, Transaction newValue)
    {
        using (var context = new Database())
        {
            var transaction = GetTransactionById(id);
            transaction = newValue;

            context.Transactions.Update(transaction);
            context.SaveChanges();

            return transaction;
        }
    }

    public static ActionResult<Transaction> DeleteTransactionById(int id)
    {

        using (var context = new Database())
        {
            var transaction = GetTransactionById(id);

            context.Transactions.Remove(transaction);
            context.SaveChanges();

            return transaction;
        }
    }
}