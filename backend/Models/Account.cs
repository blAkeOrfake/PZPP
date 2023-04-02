using System;
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
}
