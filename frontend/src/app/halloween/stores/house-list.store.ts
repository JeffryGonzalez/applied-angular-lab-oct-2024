import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { getTotalScore } from '../pages/house-rating/utils';
import { RatingsService } from '../services/ratings.service';
import { HousePendingStore } from './house-pending.store';
import { HouseSortAndFilterStore } from './sort-and-filter.store';
import { HouseStore } from './house.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withRequestStatus(),
  withEntities<HouseListEntity>(),
  withState<{ selectedHouse: string | undefined }>({
    selectedHouse: undefined,
  }),
  withComputed((store) => {
    // const pendingStore = inject(HousePendingStore);

    const houseStore = inject(HouseStore);
    const sortStore = inject(HouseSortAndFilterStore);
    return {
      getSelectedHouse: computed(() => {
        const selectedId = store.selectedHouse();
        if (selectedId) {
          return store.entityMap()[selectedId];
        } else {
          return undefined;
        }
      }),
      getAllScores: computed(() =>
        store
          .entities()
          .map(
            (e) =>
              ({ ...e, totalScore: getTotalScore(e) } as HouseRatingListItem)
          )
          .map((e) => e.totalScore)
          .sort()
      ),

      getHouseListModel: computed(() => {
        const combined = [...houseStore.entities(), ...store.entities()];
        let filtered = [
          ...combined
            .map(
              (e) =>
                ({ ...e, totalScore: getTotalScore(e) } as HouseRatingListItem)
            )
            .filter((e) => e.totalScore <= sortStore.scoreFilter()),
        ];

        if (sortStore.hasFullSize()) {
          filtered = filtered.filter((e) => e.hasFullSizeCandy);
        }
        if (sortStore.hasAmbiance()) {
          filtered = filtered.filter((e) => e.hasAmbiance);
        }
        const sortKey =
          sortStore.sortBy() === 'address' ? 'address' : 'totalScore';
        if (sortKey === 'address') {
          return [
            ...filtered.sort((a, b) => a.address.localeCompare(b.address)),
          ];
        } else {
          return [...filtered.sort((a, b) => b.totalScore - a.totalScore)];
        }
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(RatingsService);

    return {
      add: rxMethod<HouseRatingEntry>(
        pipe(
          map((h) => {
            const tempId = crypto.randomUUID();
            return [h, tempId] as [HouseRatingEntry, string];
          }),
          tap(([h, tempId]) =>
            patchState(store, addEntity({ ...h, id: tempId }), setPending())
          ),

          mergeMap(([h, id]) =>
            service.addHouseToList(h, id).pipe(
              tapResponse({
                next: () => {
                  updateState(
                    store,
                    'adding from api',
                    removeEntity(id),
                    setFulfilled()
                  );
                },
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't add house ${e.error}`)
                  ),
              })
            )
          )
        )
      ),
      setCurrent: (id: string) => patchState(store, { selectedHouse: id }),
    };
  }),
  withHooks({
    onInit(store) {
      // const filter = inject(HouseSortAndFilterStore);
      // store._load();
      // filter.setScoreFilter(store.getAllScores()[0]);
    },
  })
);
