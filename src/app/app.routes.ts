import { Routes } from '@angular/router';
import { AuthenticationScreen } from './features/authentication/layout/authentication-screen/authentication-screen';
import { LoginForm } from './features/authentication/pages/login-form/login-form';
import { RegisterUserForm } from './features/authentication/pages/register-user-form/register-user-form';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationScreen,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterUserForm },
    ],
  },
];
