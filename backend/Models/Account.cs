using System;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class Account
{
    public Account(AccountType type, int userId, double balance)
    {
        Type = type;
        UserId = userId;
        Balance = balance;
    }

    public int? Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; }
    public AccountType Type { get; set; }
    public double Balance { get; set; }

    public static IEnumerable<Account> GetAccounts()
    {
        using (var context = new Database())
        {
            return context.Accounts.ToList();
        }
    }

    public static void AddAccount(Account account)
    {
        using (var context = new Database())
        {
            context.Accounts.Add(account);
            context.SaveChanges();
        }
    }

    public static ActionResult<Account?> DeleteAccountById(int id)
    {
        using (var context = new Database())
        {
            var account = Account.GetAccountById(id);

            context.Accounts.Remove(account);
            context.SaveChanges();
            return account;
        }
    }

    public static ActionResult<Account?> UpdateAccoutById(int id, Account newValue)
    {
        using (var context = new Database())
        {
            var account = context.Accounts.FirstOrDefault(a => a.Id == newValue.Id);
            account = newValue;

            context.Accounts.Update(account);
            context.SaveChanges();
            return account;
        }
    }

    public static Account? GetAccount(Account account)
    {
        using (var context = new Database())
        {
            return context.Accounts.FirstOrDefault(a => a.Id == account.Id);
        }
    }

    public static Account? GetAccountById(int id)
    {
        using (var context = new Database())
        {
            return context.Accounts.FirstOrDefault(a => a.Id == id);
        }
    }

    public static List<Account> GetUserAccountsByUserId(int id)
    {
        using (var context = new Database())
        {
            return context.Accounts.Where(a => a.UserId == id).ToList<Account>();
        }
    }
}
