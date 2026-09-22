import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppUser } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const decide = (user: AppUser | null): boolean => {
    if (user?.role === 'admin') {
      return true;
    }
    alert('Not authorized');
    router.navigate(['/user-welcome']);
    return false;
  };

  const existing = auth.currentUser();
  if (existing) {
    return decide(existing);
  }

  // Not yet loaded in this browser session (e.g. hard refresh) — confirm with the backend
  return auth.fetchCurrentUser().pipe(
    map(user => decide(user)),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

