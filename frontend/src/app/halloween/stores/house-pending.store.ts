import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { HouseEntity } from '.';

export const HousePendingStore = signalStore(
  withEntities<HouseEntity>(),
  withDevtools('house-pending'),
  withMethods((store) => {
    return {
      addPending(house: HouseEntity) {
        patchState(store, addEntity(house));
      },
      removePending(id: string) {
        patchState(store, removeEntity(id));
      },
    };
  })
);
