
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cricket_Ticket_Booking_API.Models
{

    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeatId { get; set; }
        public string? SeatNumber { get; set; }
        public decimal? Price { get; set; }
        public bool? IsBooked { get; set; }

        public int MatchId { get; set; }
        public Match? Match { get; set; }
      
    }
}
