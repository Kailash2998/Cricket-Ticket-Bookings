using Cricket_Ticket_Booking_API.Models;
using Cricket_Ticket_Booking_API.Repositories;

namespace Cricket_Ticket_Booking_API.Services
{
    public class SeatService
    {
        private readonly ISeatRepository _seatRepository;

        public SeatService(ISeatRepository seatRepository)
        {
            _seatRepository = seatRepository;
        }

        /// <summary>
        /// load all the seats
        /// </summary>
        /// <param name="matchId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Seat>> GetSeatsByMatchIdAsync(int matchId)
        {
            return await _seatRepository.GetSeatsByMatchIdAsync(matchId);
        }

        /// <summary>
        /// get seat by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Seat> GetSeatByIdAsync(int id)
        {
            return await _seatRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Create the seats
        /// </summary>
        /// <param name="seat"></param>
        /// <returns></returns>
        public async Task AddSeatAsync(Seat seat)
        {
            await _seatRepository.AddAsync(seat);
        }

        /// <summary>
        /// update the seats
        /// </summary>
        /// <param name="seat"></param>
        /// <returns></returns>
        public async Task UpdateSeatAsync(Seat seat)
        {
            _seatRepository.UpdateAsync(seat);
            await Task.CompletedTask;
        }

        /// <summary>
        /// delete the seats
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteSeatAsync(int id)
        {
            await _seatRepository.DeleteAsync(id);
        }
    }
}
