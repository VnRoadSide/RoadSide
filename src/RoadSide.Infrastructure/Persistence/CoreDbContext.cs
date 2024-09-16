using System.Data;
using RoadSide.Core.Entities;
using RoadSide.Core.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using RoadSide.Infrastructure.Extensions;

namespace RoadSide.Infrastructure.Persistence;

public class CoreDbContext : DbContext, ICoreDbContext
{
    private IDbContextTransaction _dbContextTransaction;
    #region Ctor

    public CoreDbContext(DbContextOptions<CoreDbContext> options)
        : base(options)
    {
    }
    
    

    #endregion

    #region DbSet

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

    #endregion

    #region Methods

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }
    
    public async Task<IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default)
    {
        _dbContextTransaction = await Database.BeginTransactionAsync(isolationLevel, cancellationToken);
        return _dbContextTransaction;
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _dbContextTransaction.CommitAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderItem>()
            .HasOne(c => c.Product)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Category>()
            .HasOne(c => c.BaseCategory)
            .WithMany(c => c.Categories)
            .HasForeignKey(c => c.BaseCategoryId)
            .OnDelete(DeleteBehavior.NoAction);
        // Configuring the relationship between OrderItem and Product
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId)
            .IsRequired(); // This makes sure that ProductId is a required field

        // Configuring the relationship between OrderItem and Order
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId)
            .IsRequired(); // This makes sure that OrderId is a required field
        modelBuilder.Entity<OrderItem>()
            .HasIndex(oi => oi.ProductId).IsUnique(false);
        modelBuilder.Entity<Notifications>()
            .HasOne(n => n.To)
            .WithMany()
            .HasForeignKey(n => n.ToId)
            .OnDelete(DeleteBehavior.NoAction);
    }
    
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<DateTimeOffset>()
            .HaveConversion<DateTimeOffsetConverter>();
    }

    #endregion
}