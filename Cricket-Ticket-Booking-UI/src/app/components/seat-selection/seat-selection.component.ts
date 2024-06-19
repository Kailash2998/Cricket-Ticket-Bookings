import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { SeatService } from '../../services/seat.service';
import { Seat } from '../../interfaces/seat';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../../interfaces/booking ';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule,],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  selectedSeats: Seat[] = [];
  availableSeats: Seat[] = [];
  selectedMatchId: number | null = null;
  showSummary: boolean = false;
  totalPrice: number = 0;
  bookingConfirmed: boolean = false;
  bookingFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private seatService: SeatService,
    private bookingService: BookingService,
    public dialogRef: MatDialogRef<SeatSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public match: { matchId: number }
  ) {
    this.selectedMatchId = match.matchId;
  }

  ngOnInit(): void {
    if (this.selectedMatchId !== null) {
      this.loadSeatsByMatchId(this.selectedMatchId);
    }
  }

  loadSeatsByMatchId(matchId: number): void {
    this.seatService.getSeatsByMatchId(matchId).subscribe(
      (seats: Seat[]) => {
        this.availableSeats = seats.filter(seat => !seat.isBooked);
      },
      (error: any) => {
        console.error('Error loading seats for match:', error);
      }
    );
  }
  

  toggleSeatSelection(seat: Seat): void {
    const index = this.selectedSeats.findIndex(selectedSeat => selectedSeat.seatNumber === seat.seatNumber);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }

  cancelSelection(): void {
    this.selectedSeats = [];
    this.showSummary = false;
    this.totalPrice = 0;
  }

  closeModal(): void {
    this.dialogRef.close(this.selectedSeats);
  }

  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some(selectedSeat => selectedSeat.seatNumber === seat.seatNumber);
  }

  continueSelection(): void {
    this.showSummary = true;
    this.totalPrice = this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  cancelBooking(): void {
    this.selectedSeats = [];
    this.totalPrice = 0;
    this.showSummary = false;
    this.bookingConfirmed = false;
  }

  confirmBooking(): void {
    if (this.selectedSeats && this.selectedSeats.length > 0) {
      const userDetail = this.authService.getUserDetail();
      if (userDetail && userDetail.id) {
        const userId: string = userDetail.id;
        const booking: Booking = {
          seats: this.selectedSeats,
          userId: userId,
          bookingDateTime: new Date(),
          seatId: this.selectedSeats[0].seatId,
          bookingId: 0,
          seatNumber: '',
          match: {
            title: '', 
          },
          user: undefined,
          matchId: 0
        };
  
        console.log('Booking object before sending to backend:', booking);
  
        this.bookingService.createBooking(booking).subscribe(
          (response: Booking) => {
            console.log('Response from booking service:', response);
            if (response && response.bookingId) {
              console.log('Booking created:', response);
              this.selectedSeats.forEach(seat => seat.bookingId = response.bookingId);
              this.bookingConfirmed = true;
              this.dialogRef.close();
            } else {
              console.error('Invalid response from booking service:', response);
              this.bookingConfirmed = false;
            }
          },
          (error: any) => {
            console.error('Error creating booking:', error);
            this.bookingConfirmed = false;
          }
        );
      } else {
        console.error('User is not logged in or user detail is missing');
        this.bookingConfirmed = false;
      }
    } else {
      console.error('No seats selected');
      this.bookingConfirmed = false;
    }
  }
}  