import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-xl mb-4">
        Welcome User: {{ auth.currentUser()?.name }} {{ auth.currentUser()?.surname }}
      </h1>
      <button (click)="auth.logout()" class="bg-gray-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  `,
})
export class UserWelcomeComponent {
  constructor(public auth: AuthService) {}
}