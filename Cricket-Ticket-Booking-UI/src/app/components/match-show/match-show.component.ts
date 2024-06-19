import { Component, OnInit, ViewChild } from '@angular/core';
import { Match } from '../../interfaces/match';
import { MatchService } from '../../services/match.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-match-show',
  standalone: true,
  imports: [CommonModule,MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,RouterLink,MatPaginatorModule],
  templateUrl: './match-show.component.html',
  styleUrl: './match-show.component.scss'
})


export class MatchShowComponent implements OnInit {
  matches: Match[] = [];
  pagedMatches: Match[] = [];
  pageSize = 8;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

  bookNow(matchId: number): void {
    const dialogRef = this.dialog.open(SeatSelectionComponent, {
      width: '600px',
      disableClose: true,
      data: { matchId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  trackById(index: number, match: Match): number {
    return match.matchId; 
  }
}