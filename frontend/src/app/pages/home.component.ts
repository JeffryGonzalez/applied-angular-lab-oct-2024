import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserStore } from '@shared/user.store';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: ` <router-outlet />`,
  styles: ``,
})
export class HomeComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  userStore = inject(UserStore);
  isLoggedIn = this.userStore.userLoggedIn;
  constructor() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    effect(() => {
      if (this.isLoggedIn() && returnUrl !== '/') {
        this.router.navigate([returnUrl]);
      }
    });
  }
}
