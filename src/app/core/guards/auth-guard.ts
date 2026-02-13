import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserTokenStore } from '../services/user-token-store';
import { UserApi } from '../services/user-api';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): MaybeAsync<GuardResult> => {
  const userTokenStore = inject(UserTokenStore);
  const userApi = inject(UserApi);
  const router = inject(Router);

  const loginRoute = router.createUrlTree(['/auth/login']);

  const HAS_TOKEN = userTokenStore.hasToken();
  if (!HAS_TOKEN) return loginRoute;

  return userApi.validateToken().pipe(
    map(() => true),
    catchError(() => {
      userTokenStore.removeToken();

      return of(loginRoute);
    }),
  );
};
