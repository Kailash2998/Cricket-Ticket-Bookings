using Cricket_Ticket_Booking_API.Data;
using Cricket_Ticket_Booking_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public class BookingService : IBookingRepository
    {
        private readonly CricketDbContext _context;

        public BookingService(CricketDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// To load the all bookings
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        /// <summary>
        /// find the booking by booking id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        /// <summary>
        /// Create the bookings
        /// </summary>
        /// <param name="booking"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task AddAsync(Booking booking)
        {
            var user = await _context.Users.FindAsync(booking.UserId);
            if (user == null)
            {
                throw new ArgumentException("Invalid UserId.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// update the bookings
        /// </summary>
        /// <param name="booking"></param>
        /// <returns></returns>
        public async Task UpdateAsync(Booking booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// delete the bookings
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// get the booking by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Booking>> GetBookingsByUserAsync(string userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }
    }
}
