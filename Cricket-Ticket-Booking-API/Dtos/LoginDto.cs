using System.ComponentModel.DataAnnotations;

namespace Cricket_Ticket_Booking_API.Dtos
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string password { get; set; } = string.Empty;

    }
}
