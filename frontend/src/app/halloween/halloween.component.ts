import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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

    <section>
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class HalloweenComponent {}
