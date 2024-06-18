using System.ComponentModel.DataAnnotations;
using AutoMapper;
using RoadSide.Domain;
using Microsoft.EntityFrameworkCore;
using RoadSide.Core.Extensions;

namespace RoadSide.Core.Services.Orders;

public class VoucherService : IVoucherService
{
    private readonly ICoreDbContext _context;
    private readonly IMapper _mapper;

    public VoucherService(ICoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async ValueTask<ICollection<Voucher>> GetAllAsync()
    {
        var entities = await _context.Vouchers.ToListAsync();
        return _mapper.Map<IList<Voucher>>(entities);
    }

    public async ValueTask UpdateAsync(ICollection<Voucher> vouchers)
    {
        foreach (var voucher in vouchers)
        {
            var entity = await _context.Vouchers
                .FirstOrDefaultAsync(s => s.Id == voucher.Id);

            if (entity is null)
            {
                throw new ValidationException($"Invalid: {voucher.Id} is not existed.");
            }

            _context.Vouchers.Entry(entity).CurrentValues.SetValues(_mapper.Map<Entities.Voucher>(voucher));
            await _context.SaveChangesAsync();
        }
    }

    public async ValueTask AddAsync(Voucher voucher)
    {
        if (string.IsNullOrWhiteSpace(voucher.Id.ToString()))
        {
            throw new ValidationException($"Invalid: {nameof(Voucher.Id)} should not be empty.");
        }

        _context.Vouchers.Add(_mapper.Map<Entities.Voucher>(voucher));
        await _context.SaveChangesAsync();
    }

    public async ValueTask Remove(string id)
    {
        var entities = await _context.Vouchers.ToListAsync();
        var result = entities.Find(t => t.Id.ToString() == id);
        if (result is null)
        {
            throw new ValidationException($"Invalid: {id} is not existed.");
        }

        _context.Vouchers.Remove(result);
        await _context.SaveChangesAsync();
    }
}