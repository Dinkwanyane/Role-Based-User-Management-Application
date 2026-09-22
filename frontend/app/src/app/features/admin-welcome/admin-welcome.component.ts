import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-xl mb-4">
        Hello Administrator: {{ auth.currentUser()?.name }} {{ auth.currentUser()?.surname }}
      </h1>

      <div class="mb-6">
        <button (click)="goToCreateUser()" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">
          Create User
        </button>
        <button (click)="auth.logout()" class="bg-gray-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <h2 class="text-lg font-bold mb-4">Registered Users</h2>

      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Username</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Surname</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          @for (user of regularUsers; track user.id) {
            <tr>
              <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.username }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.surname }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
            </tr>
          }

          @if (regularUsers.length === 0) {
            <tr>
              <td colspan="5" class="border border-gray-300 px-4 py-4 text-center text-gray-500">
                No standard users found.
              </td>
            </tr>
          }
        </tbody>
      </table>
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
      console.log('BEFORE detectChanges, regularUsers:', this.regularUsers);
      this.cdr.detectChanges();
      console.log('AFTER detectChanges called');
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


