import { Routes } from '@angular/router';
import { HalloweenComponent } from './halloween.component';
import { HouseEntryComponent } from './pages/house-entry/house-entry.component';
import { HousePendingStore } from './stores/house-pending.store';
import { HouseStore } from './stores/house.store';
import { HouseApiService } from './services/house-api.service';
import { HouseListComponent } from './pages/house-list/house-list.component';
import { HouseListSortAndFilterStore } from './stores/house-sort-and-filter.store';
import { HouseListStore } from './stores/house-list.store';

export const HALLOWEEN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      HouseStore,
      HousePendingStore,
      HouseListStore,
      HouseListSortAndFilterStore,
      HouseApiService,
    ],
    component: HalloweenComponent,
    children: [
      {
        path: 'house-list',
        component: HouseListComponent,
      },
      //   children: [
      //     {
      //       path: 'edit/:id',
      //       component: HouseEditComponent,
      //     },
      //   ],
      // },
      {
        path: 'house-entry',
        component: HouseEntryComponent,
      },
    ],
  },
];
