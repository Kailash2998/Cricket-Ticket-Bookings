namespace Cricket_Ticket_Booking_API.Dtos
{
    public class UserDetailDto
    {
        public string? Id { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string[]? Roles { get; set; }

        public string? PhoneNumber { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public int AccessFailedCount { get; set; }
    }
}
