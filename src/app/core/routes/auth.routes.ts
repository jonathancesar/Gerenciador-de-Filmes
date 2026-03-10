import { Routes } from '@angular/router';

export const AUTH_ROUTER: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../../features/authentication/pages/login-form/login-form').then((m) => m.LoginForm),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../../features/authentication/pages/register-user-form/register-user-form').then(
        (m) => m.RegisterUserForm,
      ),
  },
];
