import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HouseListStore } from './stores/house-list.store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <p>This is the Fall Holiday</p>
    <div>
      <a class="btn btn-link" routerLink="house-list">List of Houses</a>
      <a class="btn btn-link" routerLink="house-entry">Add New Houses</a>
    </div>
    @if(store.error()) {
    <div role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ store.error() }}</span>
    </div>
    }
    <section>
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class HalloweenComponent {
  store = inject(HouseListStore);
}
