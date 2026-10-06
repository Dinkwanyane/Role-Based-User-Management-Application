import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppUser } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const decide = (user: AppUser | null): boolean => {
    // Allow access if the logged-in user is an admin
    if (user?.role === 'admin') {
      return true;
    }

    // Show alert if a standard user tries to access an admin page
    alert('Unauthorized access. Only administrators can access this page.');

    // Redirect the standard user back to their page
    router.navigate(['/user-welcome']);

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


