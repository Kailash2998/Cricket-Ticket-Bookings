import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Seat } from '../interfaces/seat';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SeatService } from '../services/seat.service';
import { Match } from '../interfaces/match';
import { MatchService } from '../services/match.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create-seat',
  standalone: true,
  imports: [MatInputModule,CommonModule,ReactiveFormsModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatOptionModule,MatSelectModule,],
  templateUrl: './create-seat.component.html',
  styleUrl: './create-seat.component.scss'
})

export class CreateSeatComponent implements OnInit {
  seatForm!: FormGroup;
  matches: Match[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateSeatComponent>,
    private fb: FormBuilder,
    private seatService: SeatService,
    private matchService: MatchService,
    private snackBar: MatSnackBar,
    private router: Router 
  ) { }
   

  ngOnInit(): void {
    this.initForm();
    this.loadMatches();
  }

  initForm(): void {
    this.seatForm = this.fb.group({
      seatNumber: ['', Validators.required],
      price: [0, Validators.required],
      isBooked: [false],
      matchId: [0, Validators.required]
    });
  }

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe(
      matches => this.matches = matches,
      error => console.error('Error fetching matches:', error)
    );
  }

  save(): void {
    if (this.seatForm.valid) {
      const newSeat: Seat = this.seatForm.value;
      this.seatService.createSeat(newSeat).subscribe(
        createdSeat => {
          console.log('New seat created:', createdSeat);
          this.dialogRef.close(createdSeat);
          this.snackBar.open('Seat created successfully', 'Close', { duration: 2000 });
          this.router.navigate(['/seats']); 
        },
        error => {
          console.error('Error creating seat:', error);
          this.snackBar.open('Error creating seat', 'Close', { duration: 2000 });
        }
      );
    } else {
      this.snackBar.open('Please fill out all required fields', 'Close', { duration: 2000 });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}  