import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-welcome',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/50 text-center">
        <h1 class="text-2xl font-extrabold text-gray-800 tracking-tight mb-2">
          Welcome, {{ auth.currentUser()?.name }} {{ auth.currentUser()?.surname }}
        </h1>
        <p class="text-sm text-gray-500 mb-6">You're logged in as a standard user.</p>
        <button
          type="button"
          (click)="auth.logout()"
          class="w-full py-3 px-4 bg-red-500/90 hover:bg-red-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  `,
})
export class UserWelcomeComponent {
  constructor(public auth: AuthService) {}
}


