import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AppUser } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const decide = (user: AppUser | null): boolean => {
    if (user?.role !== 'admin') {
      return true;
    }
    alert('Unauthorized access');
    router.navigate(['/user-create']);
    return false;
  };

  const existing = auth.currentUser();
  if (existing) {
    return decide(existing);
  }

  return auth.fetchCurrentUser().pipe(
    map(user => decide(user)),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};