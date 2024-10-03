import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { HouseListEntity } from '../pages/house-rating/types';

export const HousePendingStore = signalStore(
  withEntities<HouseListEntity>(),
  withDevtools('house-pending'),
  withComputed((store) => {
    return {
      getHouseListModel: computed(() =>
        store.entities().map((e) => ({ ...e, isPending: true }))
      ),
    };
  }),
  withMethods((store) => {
    return {
      addHouse: (house: HouseListEntity) => {
        patchState(store, addEntity(house));
      },
      removeHouse: (id: string) => {
        patchState(store, removeEntity(id));
      },
    };
  })
);
