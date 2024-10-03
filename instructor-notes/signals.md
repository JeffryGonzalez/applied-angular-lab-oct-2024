# Signals

```typescript
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  untracked,
  effect,
} from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <p>Your Current Score is {{ currentScore() }}</p>
      <p>Your Current Score doubled is {{ doubledScore() }}</p>
      <p>{{ originalNameScore() }}</p>
      <p>Your Name is {{ userName() }}</p>
      <div>
        <button class="btn btn-primary" (click)="increment()">+</button>
        <button class="btn btn-primary" (click)="changeName()">
          Change Name
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class GolfComponent {
  constructor() {
    // every time the score changes, I want to post it to an api, log it out, or whatever.
    effect(() => {
        console.log(this.currentScore());
      });
  }
  currentScore = signal(0);
  doubledScore = computed(() => {
    console.log('Recomputing doubleScore');
    //const x = this.userName();
    return this.currentScore() * 2;
  });

  originalNameScore = computed(() => {
    return `${untracked(this.userName)}  has a score of ${this.currentScore()}`;
  });
  userName = signal<number | string>(1138);

  increment() {

    // this.currentScore.set(this.currentScore() + 1);
    this.currentScore.update((n) => n + 1);
    // this.doubledScore.set(this.currentScore() * 2);
  }

  changeName() {
    this.userName.set('Name ' + crypto.randomUUID());
  }
}
```