import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
const COUNT_BY_VALUES = [1, 3, 5] as const;
export type CountByValues = (typeof COUNT_BY_VALUES)[number];

export const CounterPrefsStore = signalStore(
  withState<{ by: CountByValues }>({
    by: 1,
  }),
  withComputed(() => ({
    getValues: computed(() => COUNT_BY_VALUES),
  })),
  withMethods((store) => ({
    set(value: CountByValues) {
      patchState(store, { by: value });
    },
  })),
  withHooks((store) => {
    return {
      onInit: () => {
        const by = localStorage.getItem('counting-by');
        if (by !== null && !isNaN(+by)) {
          store.set(by as unknown as CountByValues);
        }
        watchState(store, (state) => {
          localStorage.setItem('counting-by', state.by.toString());
        });
      },
    };
  })
);
