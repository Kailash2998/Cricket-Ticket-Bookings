import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from '../interfaces/booking ';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatPaginatorModule ],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.scss'
})

export class UserBookingsComponent implements OnInit, AfterViewInit {
  userId!: string;
  bookings: Booking[] = [];
  pagedBookings: Booking[] = [];
  pageSize = 15;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userDetail = this.authService.getUserDetail();
    if (userDetail && userDetail.id) {
      this.userId = userDetail.id;
    } else {
      console.error('User ID is undefined');
    }
  }

  ngAfterViewInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe(
      (bookings: Booking[]) => {
        console.log('Bookings:', bookings);
        this.bookings = bookings;
        this.totalItems = bookings.length;
        this.updatePageData();
      },
      (error: any) => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  updatePageData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = Math.min(startIndex + this.paginator.pageSize, this.totalItems);
    this.pagedBookings = this.bookings.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.updatePageData();
  }
}