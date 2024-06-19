import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Seat } from '../interfaces/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  getSeatsByIds(ids: number[]): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/seat?ids=${ids.join(',')}`);
}

  getMatchName(matchId: number) {
    throw new Error('Method not implemented.');
  }
  apiUrl = environment.apiUrl;
  getMovieNames: any;

  constructor(private http: HttpClient) { }

  getAllSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/seat`);
  }

  createSeat(seat: Seat): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/seat`, seat);
  }

  getSeatById(id: string): Observable<Seat> {
    return this.http.get<Seat>(`${this.apiUrl}/seat/${id}`);
  }

  updateSeat(id: string, seat: Seat): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/seat/${id}`, seat);
  }

  deleteSeat(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/seat/${id}`);
  }

  getSeatsByMatchId(matchId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/seat/match/${matchId}`);
  }

  
  
}
