using Cricket_Ticket_Booking_API.Models;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public interface ISeatRepository
    {
        Task<IEnumerable<Seat>> GetAllAsync();
        Task<IEnumerable<Seat>> GetSeatsByMatchIdAsync(int matchId);
        Task<Seat> GetByIdAsync(int id);
        Task AddAsync(Seat seat);
        Task UpdateAsync(Seat seat);
        Task DeleteAsync(int id);
        Task<Seat> GetByIdAsync(int? seatId);
    }
}
