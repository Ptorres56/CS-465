import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
