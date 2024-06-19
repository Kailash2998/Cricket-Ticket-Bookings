using Cricket_Ticket_Booking_API.Models;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<Booking> GetByIdAsync(int id);
        Task AddAsync(Booking booking);
        Task UpdateAsync(Booking booking);
        Task DeleteAsync(int id);
        Task<IEnumerable<Booking>> GetBookingsByUserAsync(string userId);
    }
}
