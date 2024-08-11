using System.Data;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Entities;

namespace RoadSide.Core.Extensions;

public interface ICoreDbContext
{
    DbSet<AppSettings> AppSettings { get; set; }
    DbSet<Category> Categories { get; set; }
    DbSet<Prices> Prices { get; set; }
    DbSet<Products> Products { get; set; }
    DbSet<OrderItem> OrderItems { get; set; }
    DbSet<Orders> Orders { get; set; }
    DbSet<Voucher> Vouchers { get; set; }
    DbSet<User> Users { get; set; }
    DbSet<Role> Roles { get; set; }
    DbSet<UserRole> UserRole { get; set; }
    
    Task<int> SaveChangesAsync();

    DbSet<TEntity> Set<TEntity>() where TEntity : class;
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    Task<IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
}