import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CountByValues, CounterPrefsStore } from '../prefs/counter-prefs.store';

export const CounterStore = signalStore(
  withState({ current: 0 }),
  withMethods((store) => {
    const prefsStore = inject(CounterPrefsStore);
    return {
      increment: () =>
        patchState(store, { current: store.current() + prefsStore.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - prefsStore.by() }),
    };
  }),
  withComputed((store) => {
    const prefsStore = inject(CounterPrefsStore);
    return {
      decrementDisabled: computed(() => store.current() - prefsStore.by() < 0),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) {
          return '';
        }
        const isFizz = current % 3 === 0;
        const isBuzz = current % 5 === 0;
        const isFizzBuzz = isFizz && isBuzz;
        if (isFizzBuzz) {
          return 'FizzBuzz';
        }
        if (isFizz) {
          return 'Fizz';
        }
        if (isBuzz) {
          return 'Buzz';
        }
        return '';
      }),
    };
  }),
  withHooks((store) => {
    return {
      onInit: () => {
        const current = localStorage.getItem('counting-current');
        if (current !== null && !isNaN(+current)) {
          patchState(store, { current: +current });
        }
        watchState(store, (state) => {
          localStorage.setItem('counting-current', state.current.toString());
        });
      },
    };
  })
);
