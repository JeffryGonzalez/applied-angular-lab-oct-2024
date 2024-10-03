import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <span>{{ current() }}</span> `,

  styles: ``,
})
export class CounterDemoComponent {
  current = signal(0);

  isFizz = computed(() => this.current() % 3 === 0);
}
