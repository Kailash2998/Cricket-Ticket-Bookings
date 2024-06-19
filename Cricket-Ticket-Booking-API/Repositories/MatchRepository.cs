using Cricket_Ticket_Booking_API.Data;
using Cricket_Ticket_Booking_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cricket_Ticket_Booking_API.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private readonly CricketDbContext _context;

        public MatchRepository(CricketDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// To display the list of the match
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Match>> GetAllAsync()
        {
            return await _context.Matches.ToListAsync();
        }

        /// <summary>
        /// To load the match using match id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Match> GetByIdAsync(int id)
        {
            return await _context.Matches.FindAsync(id);
        }

        /// <summary>
        /// To create the match 
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        public async Task AddAsync(Match match)
        {
            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Update the Match
        /// </summary>
        /// <param name="match"></param>
        public void Update(Match match)
        {
            _context.Entry(match).State = EntityState.Modified;
            _context.SaveChanges();
        }

        /// <summary>
        /// Delete the match
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match != null)
            {
                _context.Matches.Remove(match);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// if match is exist then display the error
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> MatchExistsAsync(int id)
        {
            return await _context.Matches.AnyAsync(e => e.MatchId == id);
        }
    }

}
