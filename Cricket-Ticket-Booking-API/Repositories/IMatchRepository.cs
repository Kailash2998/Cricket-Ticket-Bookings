using Cricket_Ticket_Booking_API.Models;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public interface IMatchRepository
    {
        Task<IEnumerable<Match>> GetAllAsync();
        Task<Match> GetByIdAsync(int id);
        Task AddAsync(Match match);
        void Update(Match match);
        Task DeleteAsync(int id);
        Task<bool> MatchExistsAsync(int id);
    }
}

