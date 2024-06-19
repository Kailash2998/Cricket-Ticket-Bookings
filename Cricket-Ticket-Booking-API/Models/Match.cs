using System.ComponentModel.DataAnnotations;

namespace Cricket_Ticket_Booking_API.Models
{

    public class Match
    {
        [Key]
        public int MatchId { get; set; }
        public string? Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

        public ICollection<Seat> Seats { get; set; } = new List<Seat>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}




