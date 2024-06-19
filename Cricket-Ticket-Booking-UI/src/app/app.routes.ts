import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guards/role.guard';
import { RoleComponent } from './pages/role/role.component';
import { SeatListComponent } from './components/seat-list/seat-list.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MatchShowComponent } from './components/match-show/match-show.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'account/:id', component: AccountComponent,
        canActivate: [authGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'users', component: UsersComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'roles', component: RoleComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'seats', component: SeatListComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'matches', component: MatchListComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'bookings', component: BookingListComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },

    {
        path: 'show', component: MatchShowComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['User']
        }
    },

    {
        path: 'seatSelect', component: SeatSelectionComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['User']
        }
    },

    {
        path: 'userBooking', component: UserBookingsComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['User']
        }
    },

];
