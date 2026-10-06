import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6">

      <header class="max-w-4xl w-full mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-lg mb-6">
        <h1 class="text-white font-semibold text-lg">
          Hello Administrator: {{ auth.currentUser()?.name }} {{ auth.currentUser()?.surname }}
        </h1>
        <button
          type="button"
          (click)="auth.logout()"
          class="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          Logout
        </button>
      </header>

      <main class="max-w-4xl w-full mx-auto">
        <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/50">

          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-extrabold text-gray-800 tracking-tight">Registered Users</h2>
            <button
              type="button"
              (click)="goToCreateUser()"
              class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              + Create User
            </button>
          </div>

          <div class="overflow-x-auto rounded-xl border border-gray-200">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Username</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Surname</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (user of regularUsers; track user.id) {
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-gray-700">{{ user.id }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ user.username }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ user.name }}</td>
                    <td class="px-4 py-3 text-gray-700">{{ user.surname }}</td>
                    <td class="px-4 py-3">
                      <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                        {{ user.role }}
                      </span>
                    </td>
                  </tr>
                }

                @if (regularUsers.length === 0) {
                  <tr>
                    <td colspan="5" class="px-4 py-8 text-center text-gray-400">
                      No standard users found.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        </div>
      </main>

    </div>
  `,
})
export class AdminWelcomeComponent implements OnInit {
  regularUsers: any[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.auth.currentUser()) {
      this.auth.fetchCurrentUser().subscribe({
        next: () => this.loadUsers(),
        error: () => this.router.navigate(['/login'])
      });
    } else {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.auth.getUsers().subscribe({
      next: (users: any[]) => {
        this.regularUsers = users.filter(
          (user) => user.role?.toLowerCase() !== 'admin'
        );
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading users:', error);
      },
    });
  }

  goToCreateUser(): void {
    this.router.navigate(['/user-create']);
  }
}




