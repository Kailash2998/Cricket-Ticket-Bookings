using Cricket_Ticket_Booking_API.Models;
using Cricket_Ticket_Booking_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cricket_Ticket_Booking_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingService;

        private readonly ISeatRepository _seatRepository;

        public BookingController(IBookingRepository bookingRepository, ISeatRepository seatRepository)
        {
            _bookingService = bookingRepository;
            _seatRepository = seatRepository;
        }

        /// <summary>
        /// get the list of bookigs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllAsync();
            return Ok(bookings);
        }

        /// <summary>
        /// get booking by bookingId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(int id)
        {
            var booking = await _bookingService.GetByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }
        
        /// <summary>
        /// crete the bookings
        /// </summary>
        /// <param name="booking"></param>
        /// <returns></returns>
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult<Booking>> CreateBooking([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return BadRequest("Invalid booking data.");
            }

            try
            {
                var seat = await _seatRepository.GetByIdAsync(booking.SeatId);
                if (seat == null)
                {
                    return BadRequest("Invalid seat ID.");
                }
                if (seat.IsBooked == true)
                {
                    return BadRequest("Seat is already booked.");
                }

                seat.IsBooked = true;
                await _seatRepository.UpdateAsync(seat);

                await _bookingService.AddAsync(booking);

                return CreatedAtAction(nameof(GetBookingById), new { id = booking.BookingId }, booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        /// <summary>
        /// update the booking by bookingId
        /// </summary>
        /// <param name="id"></param>
        /// <param name="booking"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            await _bookingService.UpdateAsync(booking);
            return NoContent();
        }

        /// <summary>
        /// delete the booking by bookingId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            await _bookingService.DeleteAsync(id);
            return NoContent();
        }

        /// <summary>
        /// get the booking details by the userId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsByUser(string userId)
        {
            var bookings = await _bookingService.GetBookingsByUserAsync(userId);
            return Ok(bookings);
        }
    }
}
