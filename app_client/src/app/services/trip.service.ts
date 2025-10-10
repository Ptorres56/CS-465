import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from './trip';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripService {
  private base = '/api/trips'; // automatically proxied to Express

  constructor(private http: HttpClient) {}

  list(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base);
  }

  read(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${code}`);
  }

  create(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, trip);
  }

  update(code: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${code}`, trip);
  }

  remove(code: string): Observable<any> {
    return this.http.delete(`${this.base}/${code}`);
  }
}
