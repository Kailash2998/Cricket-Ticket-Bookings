import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../interfaces/booking ';

@Component({
  selector: 'app-edit-booking-dialog',
  templateUrl: './edit-booking-dialog.component.html',
  styleUrls: ['./edit-booking-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class EditBookingDialogComponent implements OnInit {
  editBookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Booking
  ) {
    this.editBookingForm = this.fb.group({
      bookingDate: [data.bookingDateTime, Validators.required],
      seats: [data.seats.map(seat => seat.seatNumber).join(', '), Validators.required]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.editBookingForm.valid) {
      const updatedBooking = {
        ...this.data,
        bookingDateTime: this.editBookingForm.value.bookingDate,
        seats: this.editBookingForm.value.seats.split(', ').map((seatNumber: string) => ({ seatNumber }))
      };
      this.dialogRef.close(updatedBooking);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
