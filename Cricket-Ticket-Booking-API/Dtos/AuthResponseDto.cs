namespace Cricket_Ticket_Booking_API.Dtos
{
    public class AuthResponseDto
    {
        public string? Token { get; set; } = string.Empty;

        public bool IsSuccess { get; set; }
        public required string Message { get; set; }

        public string RefreshToken { get; set; } = string.Empty;
    }
}
