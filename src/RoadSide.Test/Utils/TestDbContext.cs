using System.Data;
using RoadSide.Core.Entities;
using RoadSide.Core.Extensions;
using Microsoft.EntityFrameworkCore;

namespace RoadSide.Test.Utils;

public class TestDbContext : DbContext, ICoreDbContext
{
    public DbSet<AppSettings> AppSettings { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Prices> Prices { get; set; }
    public DbSet<Products> Products { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Orders> Orders { get; set; }
    public DbSet<Voucher> Vouchers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    public DbSet<UserRole> UserRole { get; set; }
    public DbSet<Notifications> Notification { get; set; }
    public DbSet<RoleClaims> RoleClaims { get; set; }

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }

    public Task<IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted,
        CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
    {
    }
}