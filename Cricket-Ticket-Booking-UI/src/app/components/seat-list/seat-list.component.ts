import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatService } from '../../services/seat.service';
import { Seat } from '../../interfaces/seat';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { EditSeatComponent } from '../../edit-seat/edit-seat.component';
import { CreateSeatComponent } from '../../create-seat/create-seat.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIconModule, CommonModule,MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,],
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.scss']
})

export class SeatListComponent implements OnInit {
  seats: Seat[] = [];
  pagedSeats: Seat[] = [];
  pageSize = 7;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private seatService: SeatService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log("SeatListComponent initialized.");
    this.loadSeats();
  }

  loadSeats() {
    this.seatService.getAllSeats().subscribe(seats => {
      console.log("Seats loaded:", seats);
      this.seats = seats;
      this.totalItems = seats.length;
      this.updatePageData();
    }, error => {
      console.error("Error loading seats:", error);
    });
  }

  updatePageData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = Math.min(startIndex + this.paginator.pageSize, this.totalItems);
    this.pagedSeats = this.seats.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.updatePageData();
  }

  editSeat(seat: Seat) {
    const dialogRef = this.dialog.open(EditSeatComponent, {
      width: '400px',
      data: seat 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.seatService.updateSeat(result.seatId.toString(), result).subscribe(() => {
          this.loadSeats();
          this.snackBar.open('Seat updated successfully', 'Close', { duration: 2000 });
        }, error => {
          console.error("Error updating seat:", error);
          this.snackBar.open('Error updating seat', 'Close', { duration: 2000 });
        });
      }
    });
  }

  deleteSeat(seat: Seat) {
    if (confirm(`Are you sure you want to delete seat ${seat.seatNumber}?`)) {
      this.seatService.deleteSeat(seat.seatId.toString()).subscribe(() => {
        this.loadSeats();
        this.snackBar.open('Seat deleted successfully', 'Close', { duration: 2000 });
      }, error => {
        console.error("Error deleting seat:", error);
        this.snackBar.open('Error deleting seat', 'Close', { duration: 2000 });
      });
    }
  }

createNewSeat() {
  const dialogRef = this.dialog.open(CreateSeatComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Create seat form result:', result);
    if (result && result.seatNumber && result.price && result.matchId) {
      this.seatService.createSeat(result).subscribe(
        createdSeat => {
          console.log('Seat created successfully:', createdSeat);
          this.loadSeats(); 
          this.snackBar.open('Seat created successfully', 'Close', { duration: 2000 });
        },
        error => {
          console.error("Error creating seat:", error);
          console.log('Error response:', error);
          this.snackBar.open('Error creating seat', 'Close', { duration: 2000 });
        }
      );
    } else {
      console.error("Invalid data received:", result);
      this.snackBar.open('Invalid data received', 'Close', { duration: 2000 });
    }
  });
}
}
