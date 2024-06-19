import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seat } from '../interfaces/seat';
import { SeatService } from '../services/seat.service';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-seat',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatFormFieldModule,CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './edit-seat.component.html',
  styleUrl: './edit-seat.component.scss'
})

export class EditSeatComponent implements OnInit {
  seatForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSeatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Seat,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.seatForm = this.fb.group({
      seatNumber: [this.data.seatNumber, Validators.required],
      price: [this.data.price, Validators.required]
    });
  }

  save(): void {
    if (this.seatForm.valid) {
      const updatedSeat: Seat = { ...this.data, ...this.seatForm.value };
      this.dialogRef.close(updatedSeat);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}