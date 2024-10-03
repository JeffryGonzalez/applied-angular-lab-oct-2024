import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DecrementButtonDirective,
  IncrementButtonDirective,
} from '@shared/increment-button.directive';
import { GolfStore } from '../../../shared/golf.store';

@Component({
  selector: 'app-golf-game',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <div>
      <div>
        <button appDecrementButton (click)="service.decrement()">-</button>
        <span>{{ service.currentScore() }}</span>
        <button appIncrementButton (click)="service.increment()">+</button>
        <button class="btn" (click)="service.sunk()">Sunk</button>
      </div>

      <ul>
        @for(hole of service.holes(); track hole.holeNumber) {
        <li>Hole {{ hole.holeNumber }}: {{ hole.score }}</li>
        } @empty {
        <p>
          You are on the first hole. Sink one and you'll see your history here
        </p>
        }
      </ul>
      @if(service.currentHole() === 1) {
      <p>Have a great game!</p>
      } @else {
      <p>You have a total score of {{ service.totalScore() }}</p>
      }
    </div>
  `,
  styles: ``,
})
export class GolfComponent {
  service = inject(GolfStore);
}
