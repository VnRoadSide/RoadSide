using System.ComponentModel.DataAnnotations;
using AutoMapper;
using RoadSide.Domain;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Users;

public class UsersService : IUsersService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public UsersService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async ValueTask<ICollection<User>> GetAllAsync()
    {
        var entities = await _context.Users.ToListAsync();
        return _mapper.Map<IList<User>>(entities);
    }
    
    public async ValueTask<User> GetById(Guid id)
    {
        var entity = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        return _mapper.Map<User>(entity);
    }
    
    public async ValueTask<User> GetById(BaseEntity<Guid> domain)
    {
        var entity = await _context.Users.FirstOrDefaultAsync(user => user.Id == domain.Id);
        return _mapper.Map<User>(entity);
    }

    public async ValueTask UpdateAsync(ICollection<User> users)
    {
        foreach (var user in users)
        {
            var entity = await _context.Users
                .FirstOrDefaultAsync(s => s.Id == user.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {user.Id} is not existed.");
            }
            _context.Users.Entry(entity).CurrentValues.SetValues( _mapper.Map<Entities.User>(user));
            await _context.SaveChangesAsync();
        }
    }
    
    public async ValueTask RemoveAsync(Guid id)
    {
        var entity = await _context.Users.Where(t => t.Id == id).FirstOrDefaultAsync();
        if (entity is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Users.Remove(entity);
        await _context.SaveChangesAsync();
    }
}