import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <h2>Labs</h2>
    <div>
      <a routerLink="counter" class="link">Counter</a>
    </div>
    <section>
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class LabsComponent {}
