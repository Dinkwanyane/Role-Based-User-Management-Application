import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {
    // Ensure the CSRF cookie exists before the user submits the form
    this.auth.fetchCsrfToken().subscribe();
  }

  onSubmit(): void {
  this.auth.login(this.username, this.password).subscribe({
    next: (user) => {
      if (user.role === 'admin') {
        this.router.navigate(['/admin-welcome']);
      } else {
        this.router.navigate(['/user-welcome']);
      }
    },
    error: () => {
      alert('Incorrect credentials, user does not exist');
      this.username = '';
      this.password = '';
      this.router.navigate(['/login']);
      window.location.reload();
    }
  });
}



}