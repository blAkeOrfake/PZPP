using System;
namespace backend.Models;

public class Transaction
{
    public Transaction(
        int id,
        TransactionType type,
        TransactionCategory category,
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

    public int Id { get; set; }
    public TransactionType Type { get; set; }
    public TransactionCategory Category { get; set; }
    public int FromAccountId { get; set; }
    public int ToAccountId { get; set; }
    public double Amount { get; set; }
}
