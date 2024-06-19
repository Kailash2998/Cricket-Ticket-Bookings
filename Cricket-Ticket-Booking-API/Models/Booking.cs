using System.ComponentModel.DataAnnotations;

namespace Cricket_Ticket_Booking_API.Models
{

    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
        public int? MatchId { get; set; }
        public Match? Match { get; set; }
        public int? SeatId { get; set; }
        public DateTime BookingDateTime { get; set; }
    }
}
