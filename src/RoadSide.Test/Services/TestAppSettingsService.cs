using AutoMapper;
using RoadSide.Core.Entities;
using RoadSide.Core.Extensions;
using RoadSide.Core.Services.AppSettings;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using RoadSide.Test.Utils;

namespace RoadSide.Test.Services;

[TestFixture]
public class TestAppSettingsService
{
    private static List<AppSettings> GenerateTestData(int count = 10)
    {
        List<AppSettings> data = new();
        // TODO: Generate test data
        for (var i = 0; i < count; i++)
        {
            var setting = new AppSettings
            {
                Id = Guid.NewGuid(),
                ReferenceKey = $"RefKey_{i + 1}",
                Value = $"Value_{i + 1}",
                Description = $"Description_{i + 1}",
                Type = $"Type_{i + 1}"
            };

            data.Add(setting);
        }
        return data;
    }

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        using (var dbContext = new TestDbContext(options))
        {
            var testData = GenerateTestData(); // Replace this with your list of test data
            dbContext.AppSettings.AddRange(testData);
            dbContext.SaveChanges();
        }
    }
    [Test]
    public async ValueTask TestAddSettings()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        await using var dbContext = new TestDbContext(options);
        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>()));

        var service = new AppSettingsService(dbContext, mapper);

        var setting = new RoadSide.Domain.AppSettings
        {
            Id = Guid.NewGuid(),
            ReferenceKey = "TestKey",
            Value = "TestValue",
            Description = "TestDescription",
            Type = "TestType"
        };
        
        // Act
        await service.AddAsync(setting);
        var result = await service.GetById(setting.ReferenceKey);
        
        // Assert
        Assert.IsNotNull(result);
        Assert.That(dbContext.AppSettings.Count(), Is.EqualTo(11));
        Assert.That(result.ReferenceKey, Is.EqualTo(setting.ReferenceKey));
        Assert.That(result.Value, Is.EqualTo(setting.Value));
        Assert.That(result.Description, Is.EqualTo(setting.Description));
        Assert.That(result.Type, Is.EqualTo(setting.Type));
    }

}