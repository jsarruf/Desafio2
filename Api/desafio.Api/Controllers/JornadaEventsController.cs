
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class JornadaEventsController : ControllerBase
{
    private readonly AppDbContext _context;

    public JornadaEventsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(JornadaEvent ev)
    {
        ev.Timestamp = DateTime.UtcNow;
        _context.JourneyEvents.Add(ev);
        await _context.SaveChangesAsync();
        return Ok(ev);
    }

    [HttpGet("{driverId}")]
    public async Task<IActionResult> GetByDriver(string driverId)
    {
        var events = await _context.JourneyEvents
            .Where(e => e.DriverId == driverId)
            .OrderBy(e => e.Timestamp)
            .ToListAsync();
        return Ok(events);
    }
}
