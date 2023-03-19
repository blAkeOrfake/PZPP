using Microsoft.EntityFrameworkCore;
using backend.Models;

public class Database : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=pzpp.db");
        optionsBuilder.EnableSensitiveDataLogging();
    }

    //public Database(DbContextOptions<Database> options) : base(options)
    //{
    //    Database.EnsureCreated();
    //}

    public Database()
    {
        Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; }
}


