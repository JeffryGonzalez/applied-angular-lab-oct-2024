import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserStore } from './user.store';

// return a boolean, signal(boolean), observable(boolean), route tree
export function userLoggedInGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const userStore = inject(UserStore);

    if (userStore.userLoggedIn()) {
      return true;
    } else {
      router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  };
}
