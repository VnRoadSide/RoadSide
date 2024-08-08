using System.Linq.Expressions;

namespace RoadSide.Core.Services;

public enum Sorting
{
    Ascending,
    Descending
}
public abstract class QueryPaging
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public interface IQueryFilter
{
    public string? Search { get; set; }
    public ICollection<(string, Sorting)> Filters { get; set; }
}

public static class PagingExtension
{
    public static IQueryable<TEntity> GetPaging<TEntity>(this IQueryable<TEntity> query, QueryPaging paging)
    {
        return query.Skip(paging.PageSize * (paging.Page - 1))
            .Take(paging.PageSize);
    }
}

public static class QueryFilterExtensions
{
    public static IQueryable<TEntity> GetFilter<TEntity>(this IQueryable<TEntity> query, IQueryFilter filter)
    {
        // Apply Filters
        foreach (var (propertyName, sorting) in filter.Filters)
        {
            var parameter = Expression.Parameter(typeof(TEntity), "x");
            var property = Expression.Property(parameter, propertyName);
            var lambda = Expression.Lambda(property, parameter);

            var methodName = sorting == Sorting.Ascending ? "OrderBy" : "OrderByDescending";
            var method = typeof(Queryable).GetMethods()
                .First(m => m.Name == methodName && m.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(TEntity), property.Type);
            query = (IQueryable<TEntity>)method.Invoke(null, new object[] { query, lambda });
        }

        // Apply Search
        if (!string.IsNullOrEmpty(filter.Search))
        {
            var parameter = Expression.Parameter(typeof(TEntity), "x");
            var properties = typeof(TEntity).GetProperties().Where(p => p.PropertyType == typeof(string));

            Expression? searchExpression = null;

            foreach (var property in properties)
            {
                var propertyExpression = Expression.Property(parameter, property);
                var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                var searchTerm = Expression.Constant(filter.Search);
                if (containsMethod != null)
                {
                    var containsExpression = Expression.Call(propertyExpression, containsMethod, searchTerm);

                    searchExpression = searchExpression == null ? containsExpression : Expression.OrElse(searchExpression, containsExpression);
                }
            }

            if (searchExpression != null)
            {
                var lambda = Expression.Lambda<Func<TEntity, bool>>(searchExpression, parameter);
                query = query.Where(lambda);
            }
        }

        return query;
    }
}