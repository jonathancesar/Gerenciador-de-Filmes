import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserTokenStore } from '../services/user-token-store';

export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): MaybeAsync<GuardResult> => {
  const userTokenStore = inject(UserTokenStore);
  const router = inject(Router);

  const HAS_TOKEN = userTokenStore.getToken();
  if (!HAS_TOKEN) return true;

  const exploreRoute = router.createUrlTree(['/']);

  return exploreRoute;
};
