import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CounterStore } from './counter.store';

@Component({
  selector: 'app-counter-ui-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      <button
        [disabled]="store.decrementDisabled()"
        (click)="decrement()"
        class="btn btn-error join-item"
      >
        -
      </button>
      <span class=" join-item p-2 font-black text-2xl">{{
        store.current()
      }}</span>
      <button (click)="increment()" class="btn btn-primary join-item">+</button>
    </div>
    <span class="p-2 w-12 font-bold text-2xl ">{{ store.fizzBuzz() }}</span>
  `,
  styles: `
  `,
})
export class CounterUiComponent {
  store = inject(CounterStore);

  decrement() {
    this.store.decrement();
  }
  increment() {
    this.store.increment();
  }
}
