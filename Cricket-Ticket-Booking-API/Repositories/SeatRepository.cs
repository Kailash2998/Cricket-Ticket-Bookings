using Cricket_Ticket_Booking_API.Data;
using Cricket_Ticket_Booking_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public class SeatRepository : ISeatRepository
    {
        private readonly CricketDbContext _context;

        public SeatRepository(CricketDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// To load the All seats
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Seat>> GetAllAsync()
        {
            return await _context.Seats.ToListAsync();
        }

        /// <summary>
        /// To load the seat by match id
        /// </summary>
        /// <param name="matchId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Seat>> GetSeatsByMatchIdAsync(int matchId)
        {
            return await _context.Seats.Where(s => s.MatchId == matchId).ToListAsync();
        }

        /// <summary>
        /// Get seat by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Seat> GetByIdAsync(int id)
        {
            return await _context.Seats.FindAsync(id);
        }

        /// <summary>
        /// Add the seats
        /// </summary>
        /// <param name="seat"></param>
        /// <returns></returns>
        public async Task AddAsync(Seat seat)
        {
            await _context.Seats.AddAsync(seat);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// for update the seats
        /// </summary>
        /// <param name="seat"></param>
        /// <returns></returns>
        public async Task UpdateAsync(Seat seat)
        {
            _context.Entry(seat).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Delete the seats using the id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
            var seat = await _context.Seats.FindAsync(id);
            if (seat != null)
            {
                _context.Seats.Remove(seat);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// if seat is exist give the error
        /// </summary>
        /// <param name="seatId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<Seat> GetByIdAsync(int? seatId)
        {
            if (seatId == null)
            {
                throw new ArgumentNullException(nameof(seatId));
            }

            return await _context.Seats.FirstOrDefaultAsync(s => s.SeatId == seatId);
        }
    }
}
