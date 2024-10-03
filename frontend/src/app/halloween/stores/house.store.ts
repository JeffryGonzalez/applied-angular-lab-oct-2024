import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { HouseListEntity, HouseRatingEntry } from '../pages/house-rating/types';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setPending,
  setFulfilled,
  withRequestStatus,
} from '@shared/request-status.feature';
import { pipe, tap, mergeMap, map } from 'rxjs';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { RatingsService } from '../services/ratings.service';
import { HttpErrorResponse } from '@angular/common/http';

export const HouseStore = signalStore(
  withEntities<HouseListEntity>(),
  withRequestStatus(),
  withDevtools('house'),
  withMethods((store) => {
    const service = inject(RatingsService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap(() =>
            service.getHouseList().pipe(
              tapResponse({
                next: (d) => patchState(store, setEntities(d), setFulfilled()),
                error: () =>
                  patchState(
                    store,
                    setError('Error Getting List - Server Returned Bad Data')
                  ),
              })
            )
          )
        )
      ),
      add: (entity: HouseListEntity) => patchState(store, addEntity(entity)),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
