using RoadSide.Core.Entities;
using RoadSide.Core.Extensions;
using Microsoft.EntityFrameworkCore;

namespace RoadSide.Infrastructure.Persistence;

public class CoreDbContext : DbContext, ICoreDbContext
{
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

    #endregion

    #region Methods

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
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
    }

    #endregion
}