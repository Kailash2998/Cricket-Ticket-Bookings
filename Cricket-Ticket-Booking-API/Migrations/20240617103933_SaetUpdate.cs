using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cricket_Ticket_Booking_API.Migrations
{
    /// <inheritdoc />
    public partial class SaetUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Bookings_BookingId1",
                table: "Seats");

            migrationBuilder.DropIndex(
                name: "IX_Seats_BookingId1",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "BookingId1",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Matches",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingId",
                table: "Seats",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BookingId1",
                table: "Seats",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Matches",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BookingId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Seats_BookingId1",
                table: "Seats",
                column: "BookingId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Bookings_BookingId1",
                table: "Seats",
                column: "BookingId1",
                principalTable: "Bookings",
                principalColumn: "BookingId");
        }
    }
}
