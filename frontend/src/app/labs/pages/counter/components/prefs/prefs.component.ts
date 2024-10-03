import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterPrefsStore } from './counter-prefs.store';

@Component({
  selector: 'app-counter-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Your Counting Preferences</p>
    <div class="join">
      @for(v of store.getValues(); track v) {
      <button
        [disabled]="store.by() === v"
        (click)="store.set(v)"
        class="join-item btn btn-ghost btn-outline"
      >
        {{ v }}
      </button>

      }
    </div>
  `,
  styles: ``,
})
export class CounterPrefsComponent {
  store = inject(CounterPrefsStore);
}
