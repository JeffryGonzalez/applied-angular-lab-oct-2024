import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ScoreAndFilterState } from '../pages/house-rating/types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const HouseSortAndFilterStore = signalStore(
  withState<ScoreAndFilterState>({
    scoreFilter: 12,
    hasFullSize: false,
    hasAmbiance: false,
    sortBy: 'address',
  }),
  withDevtools('house-sort-filter'),
  withMethods((store) => {
    return {
      setScoreFilter: (score: number) => {
        patchState(store, { scoreFilter: score });
      },
      toggleFullSize: () => {
        patchState(store, { hasFullSize: !store.hasFullSize() });
      },
      toggleAmbiance: () => {
        patchState(store, { hasAmbiance: !store.hasAmbiance() });
      },
      setSortByAddress: () => {
        patchState(store, { sortBy: 'address' });
      },
      setSortByScore: () => {
        patchState(store, { sortBy: 'score' });
      },
    };
  })
);
