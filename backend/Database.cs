using Microsoft.EntityFrameworkCore;
using backend.Models;

// To create migration use command:
// dotnet ef migrations add MyMigrationName

// To update db, use:
// dotnet ef database update

public class Database : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=pzpp.db");
        optionsBuilder.EnableSensitiveDataLogging();
    }

    public Database()
    {
        Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}


