using Microsoft.EntityFrameworkCore;
using backend.Models;

public class Database : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=pzpp.db");
    }

    public DbSet<User> Users{ get; set; }
}


