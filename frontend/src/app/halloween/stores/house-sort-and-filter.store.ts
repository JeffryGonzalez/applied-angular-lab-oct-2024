import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type Sortables = 'score' | 'address';
export const HouseListSortAndFilterStore = signalStore(
  withDevtools('house-list-sort-and-filter'),
  withState({
    scoreFilter: 12,
    hasFullSize: false,
    hasAmbiance: false,
    sortBy: 'score' as Sortables,
  }),

  withMethods((store) => {
    return {
      setScoreFilter(value: number) {
        patchState(store, { scoreFilter: value });
      },
      toggleFullSize() {
        patchState(store, { hasFullSize: !store.hasFullSize() });
      },
      toggleAmbiance() {
        patchState(store, { hasAmbiance: !store.hasAmbiance() });
      },
      setSortBy(value: Sortables) {
        patchState(store, { sortBy: value });
      },
    };
  })
);
