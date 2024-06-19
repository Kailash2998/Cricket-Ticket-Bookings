import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Match } from '../interfaces/match';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})

export class CreateMatchComponent implements OnInit {
  matchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      title: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    });
  }

  createMatch(): void {
    if (this.matchForm.invalid) {
      this.snackBar.open('Please fill in all fields', 'Close', { duration: 2000 });
      return;
    }

    const newMatch: Match = {
      matchId: 0,
      title: this.matchForm.value.title,
      startDateTime: new Date(this.matchForm.value.startDateTime),
      endDateTime: new Date(this.matchForm.value.endDateTime)
    };

    this.matchService.createMatch(newMatch).subscribe(
      () => {
        this.snackBar.open('Match created successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/matches']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error('Error creating match:', error);
        this.snackBar.open('Error creating match', 'Close', { duration: 2000 });
      }
    );
  }
}