import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <p>Counting is Fun</p>
    <div>
      <a routerLink="ui" class="btn btn-secondary btn-sm">Count Some Stuff</a>
      <a routerLink="prefs" class="btn btn-secondary btn-sm">Settings</a>
    </div>
    <section class="container p-8">
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class CounterComponent {}
