import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UserStore } from '@shared/user.store';

@Component({
  selector: 'app-nav-bar-end',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @switch (userStore.status()) { @case ('pending') {
    <span><span class="loading loading-spinner text-success"></span></span>
    } @case ('fulfilled') {
    <span>{{ userStore.userName() }}</span>
    } @case ('error') {
    <span>Intruder Alert... or the API is down, or whatever</span>
    } }
  `,
  styles: ``,
})
export class NavbarEndComponent {
  userStore = inject(UserStore);
}
