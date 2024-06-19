using System.ComponentModel.DataAnnotations;

namespace Cricket_Ticket_Booking_API.Dtos
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage ="Role Name is Required")]
        public string RoleName { get; set; } = null!;
    }
}
