import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminWelcomeComponent } from './features/admin-welcome/admin-welcome.component';
import { UserWelcomeComponent } from './features/user-welcome/user-welcome.component';
import { UserCreateComponent } from './features/user-create/user-create.component';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';
import { userGuard } from './core/auth/user.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-welcome',
    component: AdminWelcomeComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'user-welcome',
    component: UserWelcomeComponent,
    canActivate: [authGuard, userGuard],
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];