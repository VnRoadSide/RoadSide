using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services;

public interface IService<TDomain, TEntity>
{
    Task<T1?> FirstOrDefaultAsync<T1>(IQueryable<T1> query);
    Task<T1?> SingleOrDefaultAsync<T1>(IQueryable<T1> query);
    Task<List<T1>> ToListAsync<T1>(IQueryable<T1> query);
    Task<TDomain> AddAsync(TDomain domain, CancellationToken cancellationToken = default);
    Task<TDomain> UpdateAsync(TDomain domain, CancellationToken cancellationToken = default);
    void RemoveAsync<TId>(TId id, CancellationToken cancellationToken = default);
}

internal class Service<TDomain, TEntity> : IService<TDomain, TEntity>
    where TDomain : class
    where TEntity : class
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;
    protected DbSet<TEntity> DbSet => _context.Set<TEntity>();

    public Service(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    protected IQueryable<TEntity> GetQueryable()
    {
        return _context.Set<TEntity>();
    }
    
    protected ValueTask<TEntity?> GetByIdAsync<TId>(TId id)
    {
        return _context.Set<TEntity>().FindAsync(id);
    }
    
    public Task<T1?> FirstOrDefaultAsync<T1>(IQueryable<T1> query)
    {
        return query.FirstOrDefaultAsync();
    }

    public Task<T1?> SingleOrDefaultAsync<T1>(IQueryable<T1> query)
    {
        return query.SingleOrDefaultAsync();
    }

    public Task<List<T1>> ToListAsync<T1>(IQueryable<T1> query)
    {
        return query.ToListAsync();
    }

    public async Task<TDomain> AddAsync(TDomain domain, CancellationToken cancellationToken = default)
    {
        var entityToAdd = _mapper.Map<TEntity>(domain);
        DbSet.Add(entityToAdd);
        await _context.SaveChangesAsync(cancellationToken);
        return domain;
    }

    public async Task<TDomain> UpdateAsync(TDomain domain, CancellationToken cancellationToken = default)
    {
        var entityToUpdate = _mapper.Map<TEntity>(domain);
        DbSet.Update(entityToUpdate);
        await _context.SaveChangesAsync(cancellationToken);
        return domain;
    }

    public async void RemoveAsync<TId>(TId id, CancellationToken cancellationToken = default)
    {
        var entityToRemove = await GetByIdAsync(id);
        ArgumentNullException.ThrowIfNull(entityToRemove);
        _context.Set<TEntity>().Remove(entityToRemove);
        await _context.SaveChangesAsync(cancellationToken);
    }
}