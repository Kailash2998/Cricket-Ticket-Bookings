import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../interfaces/booking ';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  [x: string]: any;
  apiUrl = environment.apiUrl;
  getAllSeats: any;
  getSeatsByIds: any;
  getSeatsByBookingId: any;

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking`);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/booking`, booking);
  }
  

  updateBooking(id: number, booking: Booking): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/booking/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/booking/${id}`);
  }

  getBookingsByUserId(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking/user/${userId}`);
  }
  

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error); 
  }
  
}
