using Cricket_Ticket_Booking_API.Models;
using Cricket_Ticket_Booking_API.Repositories;

namespace Cricket_Ticket_Booking_API.Services
{
    public class MatchService
    {
        private readonly IMatchRepository _matchRepository;

        public MatchService(IMatchRepository matchRepository)
        {
            _matchRepository = matchRepository;
        }

        /// <summary>
        /// load the all matches 
        /// </summary>
        /// <returns></returns>
        public Task<IEnumerable<Match>> GetAllMatchesAsync()
        {
            return _matchRepository.GetAllAsync();
        }

        /// <summary>
        /// get match by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Match> GetMatchByIdAsync(int id)
        {
            return _matchRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Create the match
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        public Task AddMatchAsync(Match match)
        {
            return _matchRepository.AddAsync(match);
        }

        /// <summary>
        /// update the match
        /// </summary>
        /// <param name="match"></param>
        /// <returns></returns>
        public Task UpdateMatchAsync(Match match)
        {
            _matchRepository.Update(match);
            return Task.CompletedTask;
        }

        /// <summary>
        /// delete the matches
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task DeleteMatchAsync(int id)
        {
            return _matchRepository.DeleteAsync(id);
        }

        /// <summary>
        /// if matches exist then they give the error
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<bool> MatchExistsAsync(int id)
        {
            return _matchRepository.MatchExistsAsync(id);
        }
    }

}
