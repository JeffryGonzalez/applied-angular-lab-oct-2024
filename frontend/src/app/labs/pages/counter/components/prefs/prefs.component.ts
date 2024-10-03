import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterPrefsStore } from './counter-prefs.store';
import { CounterStoreDemo } from '../../counter.store';

@Component({
  selector: 'app-counter-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Your Counting Preferences</p>
    <div class="join">
      <button
        (click)="store.setCountby(1)"
        [disabled]="store.by() === 1"
        class="join-item btn btn-ghost btn-outline"
      >
        1
      </button>
      <button
        (click)="store.setCountby(3)"
        [disabled]="store.by() === 3"
        class="join-item btn btn-ghost btn-outline"
      >
        3
      </button>
      <button
        (click)="store.setCountby(5)"
        [disabled]="store.by() === 5"
        class="join-item btn btn-ghost btn-outline"
      >
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class CounterPrefsComponent {
  store = inject(CounterStoreDemo);
}
