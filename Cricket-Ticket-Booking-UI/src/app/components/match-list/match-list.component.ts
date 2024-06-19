import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatchService } from '../../services/match.service';
import { Match } from '../../interfaces/match';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditMatchDialogComponent } from '../../edit-match-dialog/edit-match-dialog.component';
import { CreateMatchComponent } from '../../create-match/create-match.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,

  ],
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})

export class MatchListComponent implements OnInit {
  matches: Match[] = [];
  pagedMatches: Match[] = [];
  pageSize = 7;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matchService: MatchService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe(
      matches => {
        this.matches = matches;
        this.totalItems = matches.length;
        this.updatePageData();
      },
      error => console.error('Error loading matches:', error)
    );
  }

  updatePageData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = Math.min(startIndex + this.paginator.pageSize, this.totalItems);
    this.pagedMatches = this.matches.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.updatePageData();
  }

editMatch(match: Match): void {
    const dialogRef = this.dialog.open(EditMatchDialogComponent, {
      width: '400px',
      data: match
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMatches();
        this.snackBar.open('Match updated successfully', 'Close', { duration: 2000 });
      }
    });
  }

  deleteMatch(id: number): void {
    if (confirm('Are you sure you want to delete this match?')) {
      this.matchService.deleteMatch(id).subscribe(() => {
        this.matches = this.matches.filter(match => match.matchId !== id);
        this.snackBar.open('Match deleted successfully', 'Close', { duration: 2000 });
      });
    }
  }

  createMatch(): void {
    const newMatch: Match = {
      matchId: 0,
      title: ' ',
      startDateTime: new Date(),
      endDateTime: new Date()
    };

    const dialogRef = this.dialog.open(CreateMatchComponent, {
      width: '400px',
      data: newMatch
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'object' && !('message' in result)) {
        this.matchService.createMatch(result).subscribe(
          createdMatch => {
            this.matches.push(createdMatch as unknown as Match);
            this.snackBar.open('Match created successfully', 'Close', { duration: 2000 });
          },
          error => {
            console.error('Error creating match:', error);
            this.snackBar.open('Error creating match', 'Close', { duration: 2000 });
          }
        );
      } else if (result && typeof result === 'object' && 'message' in result) {
        this.snackBar.open(result.message, 'Close', { duration: 2000 });
      } else if (result) {
        console.error('Unexpected result from dialog:', result);
      }
    });
  }


}
