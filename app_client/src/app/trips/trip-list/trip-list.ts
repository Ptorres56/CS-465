import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(private svc: TripService) {}

  ngOnInit(): void {
    this.svc.list().subscribe({
      next: data => { this.trips = data; this.loading = false; },
      error: e => { this.error = e.message || 'Load failed'; this.loading = false; }
    });
  }

  remove(code: string) {
    if (!confirm('Delete this trip?')) return;
    this.svc.remove(code).subscribe({
      next: () => this.trips = this.trips.filter(t => t.code !== code),
      error: e => this.error = e.message || 'Delete failed'
    });
  }
}


