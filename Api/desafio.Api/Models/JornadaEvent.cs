using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum EventType
{
    Start,
    PauseStart,
    PauseEnd,
    End
}

[Table("jornada")]
public class JornadaEvent
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("motorista_id")]
    public string? DriverId { get; set; }

    [Column("movimentacao")]
    public EventType EventType { get; set; }

    [Column("data")]
    public DateTime Timestamp { get; set; }
}
