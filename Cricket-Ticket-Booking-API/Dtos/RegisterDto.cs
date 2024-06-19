using System.ComponentModel.DataAnnotations;

namespace Cricket_Ticket_Booking_API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; } = string.Empty;

        [Required]
        public string Firstname { get; set; } = string.Empty;

        public string Lastname { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public List<string>? Roles { get; set; }
    }
}
