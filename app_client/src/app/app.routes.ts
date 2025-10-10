import { Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list';
import { TripFormComponent } from './trips/trip-form/trip-form';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripFormComponent },
  { path: 'trips/:code', component: TripFormComponent },
  { path: '**', redirectTo: 'trips' }
];



