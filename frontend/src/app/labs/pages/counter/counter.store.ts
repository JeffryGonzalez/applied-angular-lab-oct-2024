import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const CounterStoreDemo = signalStore(
  withState({
    current: 0,
    by: 1,
  }),
  withMethods((store) => {
    return {
      decrement() {
        patchState(store, { current: store.current() - store.by() });
      },
      increment() {
        patchState(store, { current: store.current() + store.by() });
      },
      setCountby(by: number) {
        patchState(store, { by: by });
      },
    };
  }),
  withComputed((store) => {
    return {
      decrementButtonDisabled: computed(() => store.current() - store.by() < 0),
    };
  })
);
