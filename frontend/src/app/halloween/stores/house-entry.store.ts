import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HouseEntry, RATINGS } from '.';

import { HouseStore } from './house.store';

const initialState: HouseEntry = {
  address: '',
  hasAmbiance: false,
  hasFullSizeCandy: false,
  qualityRating: 1,
  quantityRating: 1,
};

type Settable = Pick<
  HouseEntry,
  'address' | 'qualityRating' | 'quantityRating'
>;
type Toggleable = Pick<HouseEntry, 'hasAmbiance' | 'hasFullSizeCandy'>;
export const HouseEntryStore = signalStore(
  withState(initialState),
  withDevtools('house-entry'),

  withMethods((store) => {
    const houseStore = inject(HouseStore);
    return {
      set(key: keyof Settable, value: HouseEntry[typeof key]) {
        patchState(store, { [key]: value });
      },
      toggle(key: keyof Toggleable) {
        patchState(store, { [key]: !store[key]() });
      },
      add() {
        houseStore.addEntry(getState(store));
        patchState(store, initialState);
      },
    };
  }),
  withComputed((store) => {
    return {
      ratings: computed(() => RATINGS),
      totalScore: computed(() => {
        const ratedItems = store.qualityRating() + store.quantityRating();
        const bonusPoints =
          (store.hasAmbiance() ? 1 : 0) + (store.hasFullSizeCandy() ? 1 : 0);
        return ratedItems + bonusPoints;
      }),
    };
  })
);
