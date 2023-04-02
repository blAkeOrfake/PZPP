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
        int fromAccountId,
        int toAccountId,
        double amount
    )
    {
        this.Id = id;
        this.Type = type;
        this.Category = category;
        this.FromAccountId = fromAccountId;
        this.ToAccountId = toAccountId;
        this.Amount = amount;
    }

    public int? Id { get; set; }
    public TransactionType Type { get; set; }
    public TransactionCategory? Category { get; set; }
    public int FromAccountId { get; set; }
    public int ToAccountId { get; set; }
    public double Amount { get; set; }

    public static List<Transaction> GetAllTransactinos()
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

            return GetAllTransactinos().Where(t => t.FromAccountId == id || t.ToAccountId == id).ToList();
        }
    }

    public static Transaction? GetTransactionById(int id)
    {
        using (var context = new Database())
        {
            return context.Transactions.FirstOrDefault(t => t.Id == id);
        }
    }

    public static ActionResult<Transaction> MakeTransfer(
        int fromAccountId,
        int toAccountId,
        double amount,
        TransactionType type,
        TransactionCategory? category
    )
    {
        using (var context = new Database())
        {
            var firstAccount = Account.GetAccountById(fromAccountId);
            firstAccount.Balance -= amount;
            Account.UpdateAccount(firstAccount);

            var secondAccount = Account.GetAccountById(toAccountId);
            secondAccount.Balance += amount;
            Account.UpdateAccount(secondAccount);

            var newTransaction = new Transaction
            {
                Type = type,
                FromAccountId = fromAccountId,
                ToAccountId = toAccountId,
                Amount = amount
            };

            if (category != null)
            {
                newTransaction.Category = category;
            }

            AddTransaction(newTransaction);

            return newTransaction;
        }
    }

    public static void AddTransaction(Transaction transaction)
    {
        using (var context = new Database())
        {
            context.Transactions.Add(transaction);
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