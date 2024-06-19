import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match } from '../interfaces/match';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/match`).pipe(
      catchError(this.handleError)
    );
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/match/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/match`, match).pipe(
      catchError(this.handleError)
    );
  }

  updateMatch(id: number, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/match/${id}`, match).pipe(
      catchError(this.handleError)
    );
  }

  deleteMatch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/match/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
