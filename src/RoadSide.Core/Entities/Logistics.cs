using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RoadSide.Domain;

namespace RoadSide.Core.Entities;

public class Logistics
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public LogisticType LogisticType { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty; 
    [MaxLength(Int32.MaxValue)]
    public string? AdditionalPropertiesJson { get; set; }
}