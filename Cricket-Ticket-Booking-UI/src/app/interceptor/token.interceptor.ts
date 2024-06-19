import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
    });
    return next(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authService.refreshToken({
            email: authService.getUserDetail()?.email || '',
            token: authService.getToken() || '',
            refreshToken: authService.getRefreshToken() || '',
          }).pipe(
            switchMap((response: any) => {
              if (response.isSuccess) {
                localStorage.setItem('user', JSON.stringify(response));
                const newCloned = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.token}`
                  },
                });
                return next(newCloned);
              }
              return throwError(() => new Error('Token refresh failed'));
            }),
            catchError(() => {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => new Error('Token refresh failed and user logged out'));
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  return next(req);
};
