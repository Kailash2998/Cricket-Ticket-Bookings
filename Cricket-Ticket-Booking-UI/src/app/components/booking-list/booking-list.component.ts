import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Seat } from '../../interfaces/seat';
import { AuthService } from '../../services/auth.service';
import { SeatService } from '../../services/seat.service';
import { EditBookingDialogComponent } from '../../edit-booking-dialog/edit-booking-dialog.component';
import { Booking } from '../../interfaces/booking ';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  errorMessage: string | undefined;
  pagedBookings: Booking[] = []; 
  totalItems = 0; 
  pageSize = 9; 
  currentPage = 0; 

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private seatService: SeatService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBookings();
     this.updatePageData();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data: Booking[]) => {
        console.log('Bookings loaded:', data);
        this.bookings = data;
        this.loadAdditionalDetails();
        this.updatePageData();
      },
      error: (err: { message: string | undefined; }) => {
        console.error('Error loading bookings:', err);
        this.errorMessage = err.message;
      }
    });
  }

  loadAdditionalDetails(): void {
    for (const booking of this.bookings) {
      const userDetail = this.authService.getUserDetail();
      if (userDetail) {
        booking.user = {
          firstName: userDetail.firstName,
          lastName: userDetail.lastName
        };
      }

      if (booking.seatId) {
        this.seatService.getSeatById(booking.seatId.toString()).subscribe(
          (seat: Seat) => {
            console.log('Seat loaded for booking ID ' + booking.bookingId + ':', seat);
            if (!booking.seats) {
              booking.seats = [];
            }
            booking.seats.push(seat);
            booking.seatNumber = seat.seatNumber; 
          },
          (error: any) => {
            console.error('Error loading seat for booking ID ' + booking.bookingId + ':', error);
          }
        );
      }
    }
  }

  editBooking(booking: Booking): void {
    const dialogRef = this.dialog.open(EditBookingDialogComponent, {
      width: '400px',
      data: booking
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.updateBooking(booking.bookingId, result).subscribe({
          next: () => {
            console.log('Booking updated successfully');
            this.loadBookings();
          },
          error: (err: { message: string | undefined; }) => {
            console.error('Error updating booking:', err);
            this.errorMessage = err.message;
          }
        });
      }
    });
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          console.log('Booking deleted successfully');
          this.loadBookings(); 
        },
        error: (err: { message: string | undefined; }) => {
          console.error('Error deleting booking:', err);
          this.errorMessage = err.message;
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  loadInitialData(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data: any[]) => {
        console.log('Bookings loaded:', data);
        this.bookings = data;
        this.updatePageData();
      },
      error: (err: { message: string | undefined }) => {
        console.error('Error loading bookings:', err);
        this.errorMessage = err.message;
      }
    });
  }

  updatePageData(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedBookings = this.bookings.slice(startIndex, startIndex + this.pageSize);
  }

 
}
