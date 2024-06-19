import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
 const roles = route.data["roles"] as string[];
 const authService = inject(AuthService);
 const matSnackbar = inject(MatSnackBar);
 const router = inject(Router);

 const userRoles = authService.getRoles();

 if(!authService.isLoggedIn()){
  router.navigate(['/']);

  matSnackbar.open("You must login to view the page" ,"Ok",{
    duration:5000,
  });
  return false;
 }
 if(roles.some((role) => userRoles?.includes(role))) return true

 router.navigate(['/']);

  matSnackbar.open("You do not have permission to  view the page" ,"Ok",{
    duration:5000,
  });
  return false;
};
