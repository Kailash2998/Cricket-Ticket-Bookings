import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Match } from '../interfaces/match';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-edit-match-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-match-dialog.component.html',
  styleUrls: ['./edit-match-dialog.component.scss']
})
export class EditMatchDialogComponent implements OnInit {
  matchForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Match,
    private fb: FormBuilder,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      matchId: [{ value: this.data.matchId, disabled: true }],
      title: [this.data.title, Validators.required],
      startDateTime: [this.data.startDateTime, Validators.required],
      endDateTime: [this.data.endDateTime, Validators.required]
    });
  }

  save(): void {
    if (this.matchForm.valid) {
      const updatedMatch: Match = { ...this.matchForm.getRawValue(), matchId: this.data.matchId };
      this.matchService.updateMatch(this.data.matchId, updatedMatch).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
