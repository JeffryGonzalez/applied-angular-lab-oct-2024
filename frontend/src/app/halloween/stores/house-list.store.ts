import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { HouseEntity, HouseListModel } from '.';
import { HousePendingStore } from './house-pending.store';
import { HouseStore } from './house.store';
import { HouseListSortAndFilterStore } from './house-sort-and-filter.store';

export const HouseListStore = signalStore(
  withState({}),
  withComputed(() => {
    const houseStore = inject(HouseStore);
    const pendingStore = inject(HousePendingStore);
    const filterStore = inject(HouseListSortAndFilterStore);
    return {
      getHouseListModel: computed<HouseListModel[]>(() => {
        const pending = pendingStore.entities().map((h) => mapToModel(h, true));
        const houses = houseStore.entities().map((h) => mapToModel(h, false));
        let combined = [...houses, ...pending];

        combined = combined.filter(
          (h) => h.totalScore <= filterStore.scoreFilter()
        );

        if (filterStore.hasFullSize()) {
          combined = combined.filter((h) => h.hasFullSizeCandy);
        }

        if (filterStore.hasAmbiance()) {
          combined = combined.filter((h) => h.hasAmbiance);
        }

        const sortKey = filterStore.sortBy();
        const sortedCombined =
          sortKey === 'address'
            ? combined.sort((a, b) => a.address.localeCompare(b.address))
            : combined.sort((a, b) => b.totalScore - a.totalScore);

        return [...sortedCombined];
      }),
    };
  })
);

function mapToModel(house: HouseEntity, pending: boolean): HouseListModel {
  const totalScore =
    house.qualityRating +
    house.quantityRating +
    (house.hasAmbiance ? 1 : 0) +
    (house.hasFullSizeCandy ? 1 : 0);
  return {
    ...house,
    totalScore,
    isPending: pending,
  };
}
