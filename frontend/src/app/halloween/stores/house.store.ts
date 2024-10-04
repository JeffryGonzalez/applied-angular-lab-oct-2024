import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntities, addEntity, withEntities } from '@ngrx/signals/entities';
import { HouseEntity, HouseEntry } from '.';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { HousePendingStore } from './house-pending.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { HouseApiService } from '../services/house-api.service';
import { tapResponse } from '@ngrx/operators';

export const HouseStore = signalStore(
  withEntities<HouseEntity>(),
  withDevtools('house'),
  withMethods((store) => {
    const pendingStore = inject(HousePendingStore);
    const service = inject(HouseApiService);
    return {
      addEntry: rxMethod<HouseEntry>(
        pipe(
          map((entry) => [entry, crypto.randomUUID()] as [HouseEntry, string]),
          tap(([entry, id]) => pendingStore.addPending({ ...entry, id })),
          mergeMap(([entry, id]: [HouseEntry, string]) =>
            service.addHouseToList(entry, id)
          ),
          tapResponse({
            next: ([house, tempid]) => {
              patchState(store, addEntity(house));
              pendingStore.removePending(tempid);
            },
            error: (error) => console.error({ error }),
          })
        )
      ),
      _load: rxMethod<void>(
        pipe(
          switchMap(() => service.getHouseList()),
          tapResponse({
            next: (houses) => patchState(store, addEntities(houses)),
            error: (error) => console.error({ error }),
          })
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
