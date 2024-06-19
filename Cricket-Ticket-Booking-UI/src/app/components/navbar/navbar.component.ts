import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatIcon, RouterLink, MatMenuModule, CommonModule, MatSnackBarModule, MatSidenavModule, MatListModule, MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar)
  router = inject(Router);
  userDetail: any;
  sidenav: any;

  isLoggedIn() {
    return this.authService.isLoggedIn();

  }
  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('logout Successfull', "Close", {
      duration: 5000,
      horizontalPosition: 'right'
    })
    this.router.navigate(['/login'])
  };

  isAdmin() {
    const userDetail = this.authService.getUserDetail();
    return userDetail && userDetail.roles && userDetail.roles.includes('Admin');
  }

}
