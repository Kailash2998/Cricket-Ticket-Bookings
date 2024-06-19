using Cricket_Ticket_Booking_API.Models;
using Cricket_Ticket_Booking_API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cricket_Ticket_Booking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatRepository _seatRepository;

        public SeatController(ISeatRepository seatRepository)
        {
            _seatRepository = seatRepository ?? throw new ArgumentNullException(nameof(seatRepository));
        }

        /// <summary>
        /// get the list of seats
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seat>>> GetAllSeats()
        {
            try
            {
                var seats = await _seatRepository.GetAllAsync();
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// get the seats by matchId
        /// </summary>
        /// <param name="matchId"></param>
        /// <returns></returns>
        [HttpGet("match/{matchId}")]
        public async Task<ActionResult<IEnumerable<Seat>>> GetSeatsByMatchId(int matchId)
        {
            try
            {
                var seats = await _seatRepository.GetSeatsByMatchIdAsync(matchId);
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// get the seats by seatId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Seat>> GetSeatById(int id)
        {
            try
            {
                var seat = await _seatRepository.GetByIdAsync(id);
                if (seat == null)
                {
                    return NotFound("Seat not found.");
                }
                return Ok(seat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }   

        /// <summary>
        /// create the seat
        /// </summary>
        /// <param name="seat"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Seat>> CreateSeat([FromBody] Seat seat)
        {
            try
            {
                if (seat == null)
                {
                    return BadRequest("Seat object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid seat object");
                }

                await _seatRepository.AddAsync(seat);
                return CreatedAtAction(nameof(GetSeatById), new { id = seat.SeatId }, seat);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// get the seats by bookingId
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpPut("{id}/book")]
        public async Task<IActionResult> BookSeat(int id, [FromBody] int bookingId)
        {
            try
            {
                var seat = await _seatRepository.GetByIdAsync(id);
                if (seat == null)
                {
                    return NotFound();
                }
                seat.IsBooked = true; 
                await _seatRepository.UpdateAsync(seat);

                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// update the seat by id and after the booking changes the status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="seat"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeat(int id, [FromBody] Seat seat)
        {
            try
            {
                if (id != seat.SeatId)
                {
                    return BadRequest("Seat ID in the request body does not match the ID in the URL.");
                }

                await _seatRepository.UpdateAsync(seat);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// delete the bookin gby bookiingId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeat(int id)
        {
            try
            {
                var existingSeat = await _seatRepository.GetByIdAsync(id);
                if (existingSeat == null)
                {
                    return NotFound("Seat not found.");
                }

                await _seatRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
