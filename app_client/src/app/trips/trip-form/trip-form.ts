import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-form.html',
  styleUrls: ['./trip-form.css']
})
export class TripFormComponent implements OnInit {
  mode: 'create' | 'edit' = 'create';
  codeParam = '';
  busy = false;
  error = '';

  // Declare now, initialize later (constructor/ngOnInit)
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: TripService
  ) {
    // Safe to initialize here (fb is injected already)
    this.form = this.fb.group({
      code: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      length: [5, [Validators.required, Validators.min(1)]],
      price: [999, [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.codeParam = this.route.snapshot.paramMap.get('code') || '';
    this.mode = this.codeParam ? 'edit' : 'create';

    if (this.mode === 'edit') {
      this.svc.read(this.codeParam).subscribe({
        next: (t: Trip) => this.form.patchValue(t),
        error: e => this.error = e.message || 'Load failed'
      });
      this.form.get('code')?.disable();
    }
  }

  save() {
    if (this.form.invalid) return;
    this.busy = true;

    const body: any = this.mode === 'edit' ? this.form.getRawValue() : this.form.value;

    const req$ = this.mode === 'edit'
      ? this.svc.update(this.codeParam, body)
      : this.svc.create(body as Trip);

    req$.subscribe({
      next: () => this.router.navigate(['/trips']),
      error: e => { this.error = e.error?.message || e.message || 'Save failed'; this.busy = false; }
    });
  }

  cancel() { this.router.navigate(['/trips']); }
}


