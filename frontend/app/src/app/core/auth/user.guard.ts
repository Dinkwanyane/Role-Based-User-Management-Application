import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppUser } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const decide = (user: AppUser | null): boolean => {
    // Allow access if the logged-in user is a standard user
    if (user?.role === 'user') {
      return true;
    }

    // Show alert if an admin tries to access the standard user page
    alert('Unauthorized access. This page is for standard users only.');

    // Redirect the admin back to the admin page
    router.navigate(['/admin-welcome']);

    return false;
  };

  // Check if the user is already available in the Angular signal
  const existing = auth.currentUser();

  if (existing) {
    return decide(existing);
  }

  // If the user has not been loaded yet, check with the Django backend
  return auth.fetchCurrentUser().pipe(
    map(user => decide(user)),
    catchError(() => {
      // If the backend cannot confirm the user, send them to login
      router.navigate(['/login']);
      return of(false);
    })
  );
};

