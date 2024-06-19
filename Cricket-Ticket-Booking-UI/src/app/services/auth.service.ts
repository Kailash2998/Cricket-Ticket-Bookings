import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { registerRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserDetails(userId: string) {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: string) {
    throw new Error('Method not implemented.');
  }
  getUserId(): string | undefined {
    throw new Error('Method not implemented.');
  }
  getCurrentUserId() {
    throw new Error('Method not implemented.');
  }
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/login`, data).pipe(
      map((response: AuthResponse) => { 
        if (response.isSuccess) { 
          localStorage.setItem(this.userKey,JSON.stringify(response)); 
        }
        return response;
      })
    );
  }

  register(data: registerRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/register`, data);
  }

  getDetail= (): Observable<UserDetail> =>
    this.http.get<UserDetail>(`${this.apiUrl}/account/detail`);

  getUserDetail() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decodedToken: any = jwtDecode(token);
      const userDetail = {
        id: decodedToken.nameid,
        firstName: decodedToken.firstname,
        lastName: decodedToken.lastname,
        email: decodedToken.email,
        roles: decodedToken.role || [],
      };
      return userDetail;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return true;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const isTokenExpired = Date.now() >= (decoded.exp * 1000);
      return isTokenExpired;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return true;
    }
  }

  getRoles =(): string[] |null =>{
    const token = this.getToken();
    if(!token) return null;

    const decodedToken:any  = jwtDecode(token);
    return decodedToken.role || null;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  getAll =():Observable<UserDetail []> =>
    this.http.get<UserDetail[]>(`${this.apiUrl}/Account`);

  refreshToken =(data:{
    email:string;
    token: string
    refreshToken:string;

  }):Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}/Account/refresh-token`,data);

  getToken(): string | null {
    const user = localStorage.getItem(this.userKey); 
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token; 
  }

  getRefreshToken(): string | null {
    const user = localStorage.getItem(this.userKey); 
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken; 
  }


  public setToken(token: string): void {
    localStorage.setItem(this.userKey, token);
  }

  
}



 

