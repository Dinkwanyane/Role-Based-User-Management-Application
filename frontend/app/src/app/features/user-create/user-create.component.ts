import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent {
  successMessage = '';
  errorMessage = '';
  submitting = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
  this.successMessage = '';
  this.errorMessage = '';

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.submitting = true;

  this.auth.createUser(this.form.getRawValue()).subscribe({
    next: (user) => {
      this.submitting = false;
      this.successMessage = `User "${user.username}" created successfully.`;
      this.form.reset();
    },
    error: (err) => {
      this.submitting = false;

      if (err.status === 400 && err.error) {
        if (err.error.username) {
          alert('Username already exists, please use a different username');
          this.form.reset();
        } else if (err.error.detail) {
          this.errorMessage = err.error.detail;
        } else {
          const firstField = Object.keys(err.error)[0];
          const fieldVal = err.error[firstField];
          this.errorMessage = Array.isArray(fieldVal) ? fieldVal[0] : fieldVal;
        }
      } else if (err.status === 403) {
        this.errorMessage = 'You do not have permission to create users.';
      } else {
        this.errorMessage = 'An error occurred while creating the user.';
      }
    },
  });
}

  goHome(): void {
    this.router.navigate(['/admin-welcome']);
  }

  logout(): void {
    this.auth.logout();
  }
}



















